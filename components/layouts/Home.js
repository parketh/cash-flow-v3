import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

const Home = () => {
    const userGuideRef = useRef()
    const heroRef = useRef()

    function handleGetStartedClick() {
        userGuideRef.current.scrollIntoView({ behavior: "smooth" })
    }

    function handleBackToTopClick() {
        heroRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 select-none font-sans">
            <div className="h-auto w-full justify-center">
                <div
                    className="h-auto object-cover bg-no-repeat bg-right w-full justify-center flex mb-24"
                    style={{ backgroundImage: "url('images/logo-bg.png')", backgroundSize: "300px" }}
                    ref={heroRef}
                >
                    <div className="w-960 px-5 py-5">
                        <div className="h-12"></div>
                        <div className="h-96 sm:h-60 lg:h-44 overflow-hidden text-6xl font-semibold my-10 leading-tight	">
                            <span className="text-theme-dark">Use </span>
                            <Image width={48} height={48} src="/images/logo.png" alt="logo" />
                            <span className="text-theme"> Cash Flow </span>
                            <span className="text-theme-dark">to</span>
                            <span className="text-theme-dark font-normal">
                                <TypewriterText
                                    words={[
                                        "build a DCF model in minutes.",
                                        "learn to value any company.",
                                        "modernise your build processes.",
                                        "become a financial analyst.",
                                    ]}
                                />
                            </span>
                        </div>
                        <div className="bg-accent w-12 h-1 mb-8"></div>
                        <div className="text-2xl pr-3">
                            Building a financial model can be tedious and time-consuming. Cash Flow is a training and
                            automation tool to help you bootstrap that process.
                        </div>
                        <div
                            onClick={handleGetStartedClick}
                            className="flex items-center space-x-2 col-span-6 cursor-pointer mt-12 animate-bounce"
                        >
                            <img
                                onClick={handleGetStartedClick}
                                src="/images/down-arrow.png"
                                alt="down-arrow"
                                className="w-4"
                            />
                            <div onClick={handleGetStartedClick}>Get started</div>
                        </div>
                    </div>
                </div>

                <div className="h-auto w-full justify-center flex bg-gray-200 py-12" ref={userGuideRef}>
                    <div className="w-960 px-5 py-5">
                        <div class="aspect-w-16 aspect-h-9 mb-24">
                            <iframe
                                width="560"
                                height="315"
                                src="https://www.youtube.com/embed/21ZneO7Z2Dc"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                            ></iframe>
                        </div>
                        <div className="text-4xl font-semibold text-theme-dark mb-8">Quick Start Guide</div>
                        <div className="bg-accent w-12 h-1 mb-8"></div>
                        <div className="text-2xl font-semibold mb-8 pt-4">🤔 What is Cash Flow?</div>
                        <div className="bodyText">
                            Cash Flow is a tool to help you setup a robust, flexible discounted cash flow model in
                            minutes.
                        </div>
                        <div className="bodyText">
                            If you have a Capital IQ subscription, Cash Flow will automatically import financial
                            information into your model, and even calculate beta, debt ratios and more based on
                            information from a set of your pre-selected comparable companies.
                        </div>
                        <div className="bodyText">
                            You can configure your financial model in just a few clicks. Once you're done, download the
                            model to continue working on it in Excel. You can amend the model inputs and assumption at
                            any time, and of course overlay additional data and analysis as needed.
                        </div>
                        <div className="bg-accent w-12 h-1 mb-8"></div>
                        <div className="text-2xl font-semibold mb-8 pt-4">🏃 How do I get started?</div>
                        <div className="bodyText">
                            <span>Read the {""}</span>
                            <Link href="/docs" passHref>
                                <span className="textLink">documentation</span>
                            </Link>{" "}
                            <span>to get started. </span>
                        </div>
                        <div className="bodyText">
                            <span>
                                If you're new to valuation and financial analysis, we recommended first taking our free{" "}
                            </span>
                            <Link href="/course" passHref>
                                <span className="textLink">valuation crash course</span>
                            </Link>{" "}
                            <span>
                                before using the tool. If not, get stuck in straight away by following the instructions
                                on the {""}
                            </span>
                            <Link href="/docs" passHref>
                                <span className="textLink">documentation</span>
                            </Link>{" "}
                            <span>page. </span>
                        </div>
                        <div className="text-2xl font-semibold mb-8 pt-4">⛔ What doesn't Cash Flow automate?</div>
                        <div className="bodyText">
                            Cash Flow is not meant as a replacement for the analysis that goes into valuing a company.
                            The output of your model will, as always, depend on the robustness of your assumptions.
                        </div>
                        <div className="italic bodyText">“A good valuation is 75% art and 25% science."</div>
                        <div className="bodyText">
                            <span>
                                You will need to continue to apply your own experience and judgement in coming up with
                                appropriate assumptions for your model. If you're new to all this, or just need a quick
                                refresher, take the free{" "}
                            </span>
                            <Link href="/course" passHref>
                                <span className="textLink">crash course</span>
                            </Link>
                            <span> to get started!</span>
                        </div>
                        <div className="bg-accent w-12 h-1 mb-8"></div>
                        <div className="text-2xl font-semibold mb-8 pt-4">👊 Why I built Cash Flow</div>
                        <div className="bodyText">
                            When I used to work as a financial analyst, I would spend way too much time on tedious tasks
                            in Excel, either building models from scratch or auditing them for errors. This was time and
                            energy taken away from focusing on what's most important: understanding companies and the
                            drivers of their value.
                        </div>
                        <div className="bodyText">
                            Cash Flow is a proof of concept for an idea I've had over the last few years: that we can
                            re-use the models we have built in the past and configure them in programmable ways.
                        </div>
                        <div className="bodyText">
                            <span>
                                I sincerely hope you enjoy using the tool. I would also appreciate if you share any
                                feedback, including descriptions of any bugs or errors you find, using the{" "}
                            </span>
                            <Link href="/download" passHref>
                                <span className="textLink">feedback form</span>
                            </Link>
                            <span>.</span>
                        </div>
                        <div className="bodyText"> - Park</div>
                        <div
                            onClick={handleBackToTopClick}
                            className="flex items-center space-x-2 col-span-6 cursor-pointer mt-12"
                        >
                            <img
                                onClick={handleBackToTopClick}
                                src="/images/up-arrow.png"
                                alt="up-arrow"
                                className="w-4"
                            />
                            <div onClick={handleBackToTopClick}>Back to top</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const TypewriterText = ({ words }) => {
    const [index, setIndex] = useState(0)
    const [subIndex, setSubIndex] = useState(0)
    const [blink, setBlink] = useState(true)
    const [reverse, setReverse] = useState(false)

    // typeWriter
    useEffect(() => {
        // if (index === words.length) return

        if (subIndex === words[index].length + 1 && !reverse) {
            setReverse(true)
            return
        }

        if (subIndex === 0 && reverse) {
            setReverse(false)
            if (index === words.length - 1) {
                setIndex(0)
            } else {
                setIndex((prev) => prev + 1)
            }
            return
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1))
        }, Math.max(reverse ? 1 : subIndex === words[index].length ? 1500 : 100, parseInt(Math.random() * 100)))

        return () => clearTimeout(timeout)
    }, [subIndex, index, reverse])

    // blinker
    useEffect(() => {
        const timeout2 = setTimeout(() => {
            setBlink((prev) => !prev)
        }, 500)
        return () => clearTimeout(timeout2)
    }, [blink])

    return (
        <>
            <div>
                {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
                <span className="opacity-0"> .</span>
            </div>
        </>
    )
}

export default Home
