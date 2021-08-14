import React, { useState } from "react"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import "/styles/index.css"

const App = ({ Component, pageProps }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="leading-6 sans-serif">
            <Head>
                <title>Cash Flow</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="flex flex-col h-screen">
                <Menubar />
                <Component {...pageProps} />
            </div>
        </div>
    )
}

const Menubar = () => {
    const router = useRouter()
    const page = router.pathname.substring(router.pathname.lastIndexOf("/") + 1)
    const pageMap = {
        config: "Configuration",
        "[slug]": "Course",
        course: "Course",
        download: "Download",
        docs: "Documentation",
        starter: "Documentation",
    }

    let pageName = pageMap[page]

    const showTitle = page === "" ? true : false

    return (
        <div className="bg-white h-auto px-6 py-4 w-full grid grid-cols-4 sticky font-sans">
            <div className="col-span-1 flex space-x-4 w-48">
                <Link href="/" passHref>
                    <input
                        type="image"
                        className="mt-1 h-7 cursor-pointer hover:opacity-80"
                        src="/images/logo.png"
                        alt="logo"
                    />
                </Link>
                <span className="mt-1 text-lg text-theme font-semibold">{showTitle ? "Cash Flow" : ""}</span>
            </div>
            <div className="col-span-2 text-center pt-1">
                <span className="text-theme text-xl font-semibold">{pageName}</span>
            </div>
            <div className="col-span-1 pt-2 space-x-2 sm:space-x-4 w-48 text-right justify-self-end items-center">
                <Link href="/docs" passHref>
                    <input
                        type="image"
                        className={
                            "w-6 cursor-pointer hover:opacity-80 pb-1 border-b-2 border-accent " +
                            (pageName === "Documentation" ? "border-opacity-100" : "border-opacity-0")
                        }
                        src="/images/docs.png"
                        alt="docs"
                    />
                </Link>
                <Link href="/course" passHref>
                    <input
                        type="image"
                        className={
                            "w-6 cursor-pointer hover:opacity-80 pb-1 border-b-2 border-accent " +
                            (pageName === "Course" ? "border-opacity-100" : "border-opacity-0")
                        }
                        src="/images/course.png"
                        alt="course"
                    />
                </Link>
                <Link href="/config" passHref>
                    <input
                        type="image"
                        className={
                            "w-6 cursor-pointer hover:opacity-80 pb-1 border-b-2 border-accent " +
                            (pageName === "Configuration" ? "border-opacity-100" : "border-opacity-0")
                        }
                        src="/images/settings.png"
                        alt="config"
                    />
                </Link>
                <Link href="/download" passHref>
                    <input
                        type="image"
                        className={
                            "w-6 cursor-pointer hover:opacity-80 pb-1 border-b-2 border-accent " +
                            (pageName === "Download" ? "border-opacity-100" : "border-opacity-0")
                        }
                        src="/images/download.png"
                        alt="download"
                    />
                </Link>
            </div>
        </div>
    )
}

export default App
