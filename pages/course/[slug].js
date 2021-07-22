import React, { useRef } from 'react'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import gfm from 'remark-gfm'

import FormService from "/services/FormService"
import {CourseTopics, CourseIndex} from '/data/CourseIndex'


// export async function getStaticPaths() {
//     const paths = CourseIndex.map((page) => ({
//         params: { slug: page },
//     }))

//     console.log(paths)
    
//     return { paths, fallback: false }
// }

export async function getServerSideProps({ params }) {
    const slug = params.slug
    console.log(slug)

    if (!slug) {
        return {
            props: {
                data: {content: null},
                current: null,
                next: null,
                previous: null
            }
        }
    }

    const index = CourseIndex.findIndex(page => page === slug)
    
    // Import our .md file using the `slug` from the URL
    const content = await FormService.getPages(slug)

    // Parse .md data through `matter`
    const data = matter(content)
    
    // Pass data to our component props
    return {
        props: {
            data: { ...data },
            current: slug,
            next: {contents: CourseIndex[index + 1], show: (index === CourseIndex.length - 1) ? false : true},
            previous: {contents: CourseIndex[index - 1], show: (index === 0) ? false : true}
        }
    }
}

const PostTemplate = ({ data, current, previous, next }) => {    
    const renderers = {
        img: ({ alt, src, title }) => (
            <div className="text-center justify-center flex -my-4">
                <img 
                    alt={alt} 
                    src={src} 
                    title={title}
                    className="max-w-xl block w-full"
                />
            </div>
        ),
        p: props => <div className="mb-6" {...props} />
    }

    return (
        <div className="overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-50 scrollbar-w-2 scrollbar-thumb-rounded-full font-sans">
            <div className="h-auto w-full px-5 py-5 space-y-2 flex justify-center">
                <div className="w-768">
                    <ProgressBar current={current}/>
                    <article className="prose prose-2xl">
                        <ReactMarkdown children={data.content} className="bodyTextTutorial" remarkPlugins={[gfm]} transformImageUri={uri => uri.startsWith("http") ? uri : `/${uri}`} components={renderers} skipHtml={false}/>
                    </article>
                    <div className="mt-64"></div>
                </div>
                <NavBar previous={previous} next={next}/>
            </div>
        </div>
    )
}

const ProgressBar = ({ current }) => {
    if (!current) {
        return (
            <div></div>
        )
    }
    
    const numToLetter = (n) => {
        let result = ''
        do {
            result = (n % 26 + 10).toString(36) + result
            n = Math.floor(n / 26) - 1
        } while (n >= 0)
    
        return result
    }

    const letterToNum = (l) => {
        return Math.max(l.split('').reduce((r, a) => r * 26 + parseInt(a, 36) - 9, 0) - 1, 0)
    }
    
    const topics = CourseTopics.map(topic => ({
        ...topic,
        page: numToLetter(topic.index) + '-' + topic.slug + '-1',
        letter: numToLetter(topic.index).toUpperCase(),
        name: topic.name.toUpperCase()
    }))
    
    const currTopic = letterToNum(current.split('-')[0])
    const currPage = Number(current.split('-')[2])
    
    return ( 
        <div className="select-none">
            <ProgressBarTopics topics={topics} currTopic={currTopic} />
            <ProgressBarPages currTopic={currTopic} numToLetter={numToLetter} currPage={currPage}/>
        </div>
    )
}

const ProgressBarTopics = ({ topics, currTopic }) => {    
    const onWheel = (event) => {
        event.preventDefault()
        const container = scrollRef.current
        const containerScrollPosition = scrollRef.current.scrollLeft
    
        container.scrollTo({
            top: 0,
            left: containerScrollPosition + event.deltaY,
            behaviour: "smooth"
        })
    }

    const scrollRef = useRef()

    return (
        <div className="relative ">
            <div className="overflow-x-auto scrollbar flex border-b-1 pb-4 mb-3" ref={scrollRef} onWheel={onWheel}>
                {topics.map(topic => {
                    if (topic.index < currTopic) {
                        return (
                            <ProgressBarTopicItem topic={topic} imgSrc='/images/progress-done.png' alt="progress-done" style1="cursor-pointer" style2="text-white" style3="cursor-pointer" />
                        )
                    }
                    else if (topic.index === currTopic) {
                        return (
                            <ProgressBarTopicItem topic={topic} imgSrc='/images/progress-current.png' alt="progress-current" style1="text-theme" style3="text-theme" enableLink={false} />
                        )
                    }
                    return (
                        <ProgressBarTopicItem topic={topic} imgSrc='/images/progress-none.png' alt="progress-none" style1="cursor-pointer" style2="text-gray-400" style3="cursor-pointer text-gray-300" />
                    )
                })}
            </div>
            <div className="w-full h-1 rounded-3xl absolute top-4 bg-opacity-60 z-0 bg-gradient-to-r from-theme via-gray-400 to-white" />           
        </div>
    )
}

const ProgressBarTopicItem = ({ topic, imgSrc, imgAlt, style1, style2, style3 }) => {
    return (
        <Link href={'/course/' + topic.page} passHref>
            <div className={"grid grid-rows-2 justify-items-center z-50 " + style1} key={topic.index}>
                <div className="relative mb-1">
                    <img className="w-8" src={imgSrc} alt={imgAlt} />
                    <div className={"absolute top-0 pt-2 w-full text-center font-medium text-xs " + style2}>{topic.letter}</div>
                </div>
                <span className={"mx-4 w-24 text-center mt-1 text-xs font-semibold tracking-wide " + style3}>{topic.name}</span>
            </div>
        </Link>
    )
}


const ProgressBarPages = ({ currTopic, numToLetter, currPage }) => {
    let topicPages = CourseTopics.map(topic => {
        let pages = []
        for (let i = 1; i <= topic.numPages; i++) {
            if (topic.index === currTopic) {
                pages.push({
                    index: i,
                    url: numToLetter(topic.index) + '-' + topic.slug + '-' + i,
                    name: '',
                    letter: i
                })
            }
            
        }
        return pages
    })
    
    topicPages = topicPages[currTopic]

    return (
        <div className="flex border-b-1 mb-8 pb-2">
            {topicPages.map(page => {
                if (page.index < currPage) {
                    return (
                        <Link href={'/course/' + page.url} passHref>
                            <ProgressBarPageItem page={page} imgSrc="/images/progress-done.png" imgAlt="progress-done" style1="cursor-pointer" style2="text-white" />
                        </Link>
                    )
                } else if (page.index === currPage) {
                    return (
                        <ProgressBarPageItem page={page} imgSrc="/images/progress-current.png" imgAlt="progress-current" style2="text-theme"/>
                    )
                }
                return (
                    <Link href={'/course/' + page.url} passHref>
                        <ProgressBarPageItem page={page} imgSrc="/images/progress-none.png" imgAlt="progress-none" style1="cursor-pointer" style2="text-gray-500" />
                    </Link>
                )
            })}           
        </div>
    )
}

const ProgressBarPageItem = ({ page, imgSrc, imgAlt, style1, style2 }) => {
    return (
        <Link href={'/course/' + page.url} passHref>
            <div className={"relative mb-1 justify-items-center mx-3 " + style1}>
                <img className="w-7" src={imgSrc} alt={imgAlt} />
                <div className={"absolute bottom-0 pb-1 w-full text-center font-medium text-sm " + style2}>{page.letter}</div>
            </div>
        </Link>
    )
}

const NavBar = ({ previous, next }) => {
    if (!previous || !next) {
        return (
            <div></div>
        )
    }
    return (
        <div className="flex absolute bottom-0 bg-white h-32 md:h-20 w-screen bg-opacity-0 justify-center align-middle select-none">
            <div className="flex flex-wrap backdrop-filter backdrop-blur-lg bg-opacity-30 border-t border-gray-200 justify-center py-3 w-screen h-full space-x-4">
                <div className="w-768 flex justify-between px-6">
                    <NavButton page={previous} imgSrc={"/images/previous.png"} alt="previous" />
                    <NavButton page={{contents: "", show: true}} imgSrc={"/images/home.png"} alt="home" />
                    <NavButton page={next} imgSrc={"/images/next.png"} alt="next" />
                </div>
            </div>
        </div>
    )
}

const NavButton = ({ page, imgSrc, alt }) => {
    if (page.show) {
        return (
            <Link href={'/course/' + ((page.contents === 'index' ? "" : page.contents) || "")} passHref>
                <input className="w-6 h-6" type="image" src={imgSrc} alt={alt} />
            </Link>
        )
    } else {
        return (
            <div>
            </div>
        )
    }
}

export default PostTemplate