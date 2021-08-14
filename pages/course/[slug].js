import React, { useState, useRef } from "react"
import matter from "gray-matter"
import ReactMarkdown from "react-markdown"
import Link from "next/link"
import gfm from "remark-gfm"

import letterToNum from "@Utils/letterToNum"
import numToLetter from "@Utils/numToLetter"

import { CourseTopics, CourseIndex } from "@CourseIndex/CourseIndex"
import path from "path"
import getConfig from "next/config"

import fs from "fs"

export async function getStaticPaths() {
    if (CourseIndex.includes("id")) {
        CourseIndex.shift("id")
    }

    const paths = await CourseIndex.map((page) => ({
        params: {
            slug: page,
        },
    }))
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const { slug } = params

    if (!CourseIndex.includes("id")) {
        CourseIndex.unshift("id")
    }

    if (!slug) {
        return {
            data: { content: null },
            current: null,
            next: null,
            previous: null,
        }
    }

    const id = CourseIndex.findIndex((page) => page === slug)

    // Import our .md file using the `slug` from the URL
    const content = await fs.readFileSync(
        path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, `public/coursepages/${slug}.md`),
        "utf8"
    )

    // Parse .md data through `matter`
    const data = matter(content)

    // Pass data to our component props
    return {
        props: {
            data: JSON.parse(JSON.stringify(data.content)),
            current: slug,
            next: {
                contents: id === CourseIndex.length - 1 ? "" : CourseIndex[id + 1],
                show: id === CourseIndex.length - 1 ? false : true,
            },
            previous: { contents: id === 0 ? "" : CourseIndex[id - 1], show: id === 0 ? false : true },
        },
    }
}

const PostTemplate = ({ data, current, next, previous }) => {
    const [allowScrolling, setAllowScrolling] = useState(true)
    const scrollRef = useRef()

    const toggleScrolling = () => {
        setAllowScrolling(!allowScrolling)
        if (allowScrolling) {
            scrollRef.current.style.overflow = "hidden"
        } else {
            scrollRef.current.style.overflow = "auto"
        }
    }

    const renderers = {
        img: ({ alt, src, title }) => (
            <div className="text-center justify-center flex -my-4">
                <img alt={alt} src={src} title={title} className="max-w-xl block w-full" />
            </div>
        ),
        p: (props) => <div className="mb-6" {...props} />,
    }

    return (
        <>
            <div
                className="overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 select-none font-sans"
                ref={scrollRef}
            >
                <div className="h-auto w-full space-y-2 flex justify-center">
                    <div className="w-screen max-w-768 px-5 py-5">
                        <div onMouseEnter={toggleScrolling} onMouseLeave={toggleScrolling}>
                            <ProgressBar current={current} />
                        </div>
                        <article className="prose prose-2xl">
                            <ReactMarkdown
                                children={data}
                                className="bodyTextTutorial"
                                remarkPlugins={[gfm]}
                                transformImageUri={(uri) => (uri.startsWith("http") ? uri : `/${uri}`)}
                                components={renderers}
                                skipHtml={false}
                            />
                        </article>
                        <div className="mt-64"></div>
                    </div>
                </div>
            </div>
            <NavBar previous={previous} next={next} />
        </>
    )
}

const ProgressBar = ({ current }) => {
    // Hide status bar on Course home page
    if (!current) {
        return <div></div>
    }

    const topics = CourseTopics.map((topic) => ({
        ...topic,
        page: numToLetter(topic.id) + "-" + topic.slug + "-1",
        letter: numToLetter(topic.id).toUpperCase(),
        name: topic.name.toUpperCase(),
    }))

    const currTopic = letterToNum(current.split("-")[0])
    const currPage = Number(current.split("-")[2])

    return (
        <div className="select-none">
            <ProgressBarTopics topics={topics} currTopic={currTopic} />
            <ProgressBarPages currTopic={currTopic} numToLetter={numToLetter} currPage={currPage} />
        </div>
    )
}

const ProgressBarTopics = ({ topics, currTopic }) => {
    const onWheel = (event) => {
        const container = scrollRef.current
        const containerScrollPositionX = container.scrollLeft
        const containerScrollPositionY = container.scrollTop

        container.scrollTo({
            top: containerScrollPositionY,
            left: containerScrollPositionX + event.deltaY,
            behaviour: "smooth",
        })
    }

    const scrollRef = useRef()

    return (
        <div className="relative">
            <div
                className="overflow-x-auto scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 inline-flex border-b-1 pb-5 mb-3 w-full"
                ref={scrollRef}
                onWheel={onWheel}
            >
                {topics.map((topic) => {
                    let imgSrc, alt, wrapperStyle, letterStyle, labelStyle

                    if (topic.id < currTopic) {
                        imgSrc = "/images/progress-done.png"
                        alt = "progress-done"
                        wrapperStyle = "cursor-pointer"
                        letterStyle = "text-white"
                        labelStyle = "cursor-pointer"
                    } else if (topic.id === currTopic) {
                        imgSrc = "/images/progress-current.png"
                        alt = "progress-current"
                        wrapperStyle = "text-theme"
                        letterStyle = ""
                        labelStyle = "text-theme"
                    } else {
                        imgSrc = "/images/progress-none.png"
                        alt = "progress-none"
                        wrapperStyle = "cursor-pointer"
                        letterStyle = "text-gray-400"
                        labelStyle = "cursor-pointer text-gray-300"
                    }

                    return (
                        <div key={topic.id} className="z-50">
                            <ProgressBarTopicItem
                                topic={topic}
                                imgSrc={imgSrc}
                                alt={alt}
                                wrapperStyle={wrapperStyle}
                                letterStyle={letterStyle}
                                labelStyle={labelStyle}
                            />
                        </div>
                    )
                })}
            </div>
            <div className="w-full h-0.5 rounded-3xl absolute top-4 bg-opacity-60 z-0 bg-gradient-to-r from-theme via-gray-400 to-white" />
        </div>
    )
}

const ProgressBarTopicItem = ({ topic, imgSrc, imgAlt, wrapperStyle, letterStyle, labelStyle }) => {
    return (
        <Link href={"/course/" + topic.page} passHref>
            <div className={"grid grid-rows-2 justify-items-center " + wrapperStyle}>
                <div className="relative mb-1">
                    <img className="w-8" src={imgSrc} alt={imgAlt} />
                    <div className={"absolute top-0 pt-2 w-full text-center font-medium text-xs " + letterStyle}>
                        {topic.letter}
                    </div>
                </div>
                <span className={"mx-4 w-24 text-center mt-1 text-xs font-semibold tracking-wide " + labelStyle}>
                    {topic.name}
                </span>
            </div>
        </Link>
    )
}

const ProgressBarPages = ({ currTopic, numToLetter, currPage }) => {
    let topicPages = CourseTopics.map((topic) => {
        let pages = []
        for (let i = 1; i <= topic.numPages; i++) {
            if (topic.id === currTopic) {
                pages.push({
                    id: i,
                    url: numToLetter(topic.id) + "-" + topic.slug + "-" + i,
                    name: "",
                    letter: i,
                })
            }
        }
        return pages
    })

    topicPages = topicPages[currTopic]

    return (
        <div className="flex border-b-1 mb-8 pb-2">
            {topicPages.map((page) => {
                let imgSrc, imgAlt, wrapperStyle, textStyle
                if (page.id < currPage) {
                    imgSrc = "/images/progress-done.png"
                    imgAlt = "progress-done"
                    wrapperStyle = "cursor-pointer"
                    textStyle = "text-white"
                } else if (page.id === currPage) {
                    imgSrc = "/images/progress-current.png"
                    imgAlt = "progress-current"
                    wrapperStyle = ""
                    textStyle = "text-theme"
                } else {
                    imgSrc = "/images/progress-none.png"
                    imgAlt = "progress-none"
                    wrapperStyle = "cursor-pointer"
                    textStyle = "text-gray-400"
                }

                return (
                    <div key={page.id}>
                        <ProgressBarPageItem
                            page={page}
                            imgSrc={imgSrc}
                            imgAlt={imgAlt}
                            wrapperStyle={wrapperStyle}
                            textStyle={textStyle}
                        />
                    </div>
                )
            })}
        </div>
    )
}

const ProgressBarPageItem = ({ page, imgSrc, imgAlt, wrapperStyle, textStyle }) => {
    return (
        <div key={page.id}>
            <Link href={"/course/" + page.url} passHref>
                <div className={"relative mb-1 justify-items-center mx-3 " + wrapperStyle}>
                    <img className="w-7" src={imgSrc} alt={imgAlt} />
                    <div className={"absolute bottom-0 pb-1 w-full text-center font-medium text-sm " + textStyle}>
                        {page.letter}
                    </div>
                </div>
            </Link>
        </div>
    )
}

const NavBar = ({ previous, next }) => {
    if (!previous || !next) {
        return <div></div>
    }
    return (
        <div className="flex absolute bottom-0 bg-white h-32 md:h-20 w-screen bg-opacity-0 justify-center align-middle select-none">
            <div className="flex flex-wrap backdrop-filter backdrop-blur-lg bg-opacity-30 border-t border-gray-200 justify-center py-3 w-screen h-full space-x-4">
                <div className="w-768 flex justify-between px-6">
                    <NavButton page={previous} imgSrc={"/images/previous.png"} alt="previous" />
                    <NavButton page={{ contents: "", show: true }} imgSrc={"/images/home.png"} alt="home" />
                    <NavButton page={next} imgSrc={"/images/next.png"} alt="next" />
                </div>
            </div>
        </div>
    )
}

const NavButton = ({ page, imgSrc, alt }) => {
    if (page.show) {
        return (
            <Link href={"/course/" + ((page.contents === "id" ? "" : page.contents) || "")} passHref>
                <input className="w-6 h-6" type="image" src={imgSrc} alt={alt} />
            </Link>
        )
    } else {
        return <div></div>
    }
}

export default PostTemplate
