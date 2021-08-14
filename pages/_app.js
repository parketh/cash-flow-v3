import React, { useState } from "react"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import { UserProvider, useUser } from "@auth0/nextjs-auth0"
import "/styles/index.css"
import Home from "@Layouts/Home"

const App = ({ Component, pageProps }) => {
    return (
        <div className="leading-6 sans-serif">
            <Head>
                <title>Cash Flow</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="flex flex-col h-screen">
                <UserProvider>
                    <Content Component={Component} pageProps={pageProps} />
                </UserProvider>
            </div>
        </div>
    )
}

const Content = ({ Component, pageProps }) => {
    const { user, error, isLoading } = useUser()

    if (isLoading) return <LoadingScreen />
    if (error) return <>{error.message}</>
    if (user) {
        return (
            <>
                <LoggedInMenubar user={user} />
                <Component {...pageProps} />
            </>
        )
    }
    return (
        <>
            <LoggedOutMenubar />
            <Home />
        </>
    )
}

const LoadingScreen = () => {
    return (
        <>
            <div className="h-screen flex">
                <div className="m-auto text-lg font-semibold">Loading...</div>
            </div>
        </>
    )
}

const LoggedOutMenubar = () => {
    const [hover, setHover] = useState("")

    const onHover = () => {
        setHover("Login to Web App")
    }
    const onLeave = () => {
        setHover("")
    }

    return (
        <div className="bg-white h-auto px-6 py-4 w-full grid grid-cols-2 sticky font-sans">
            <div className="col-span-1 flex space-x-4 w-48">
                <Link href="/" passHref>
                    <input
                        type="image"
                        className="mt-1 h-7 cursor-pointer hover:opacity-80"
                        src="/images/logo.png"
                        alt="logo"
                    />
                </Link>
                <span className="mt-1 text-lg text-theme font-semibold">Cash Flow</span>
            </div>
            <div className="mt-2 justify-self-end relative">
                <div className="font-semibold text-sm absolute right-9 w-32 text-right mt-0.5">{hover}</div>
                <a href="/api/auth/login">
                    <input
                        type="image"
                        className="w-6 cursor-pointer hover:opacity-80"
                        src="/images/login.png"
                        alt="login"
                        onMouseEnter={onHover}
                        onMouseLeave={onLeave}
                    />
                </a>
            </div>
        </div>
    )
}

const LoggedInMenubar = ({ user }) => {
    const [hover, setHover] = useState("")
    const [expanded, setExpanded] = useState(false)

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

    const handleClickMenu = (event) => {
        event.preventDefault()
        setExpanded(!expanded)
    }

    const pages = [
        { slug: "docs", name: "Documentation" },
        { slug: "course", name: "Course" },
        { slug: "config", name: "Configuration" },
        { slug: "download", name: "Download" },
    ]

    return (
        <div className="bg-white h-auto px-6 py-4 w-full grid grid-cols-4 font-sans relative">
            <div className="col-span-1 flex space-x-4 w-48">
                <Link href="/" passHref>
                    <input
                        type="image"
                        className="mt-1.5 h-7 cursor-pointer hover:opacity-80"
                        src="/images/logo.png"
                        alt="logo"
                    />
                </Link>
                <span className="mt-1 text-lg text-theme font-semibold">{showTitle ? "Cash Flow" : ""}</span>
            </div>
            <div className="col-span-2 text-center pt-1">
                <span className="text-theme text-xl font-semibold">{pageName}</span>
            </div>
            <div className="col-span-1 pt-2 space-x-2 sm:space-x-4 w-48 text-right justify-self-end justify-end hidden lg:flex">
                {pages.map((page) => (
                    <MenubarItem slug={page.slug} name={page.name} pageName={pageName} setHover={setHover} />
                ))}
                <MenubarItemLogout setHover={setHover} />
            </div>
            <div className="grid grid-cols-2 space-x-3 justify-end justify-self-end lg:hidden mt-1">
                <div className="grid space-y-3">
                    <input
                        type="image"
                        className="pt-1 w-6 opacity-60"
                        src="/images/menu.png"
                        alt="menu"
                        onClick={handleClickMenu}
                    />
                    <div className={"col-span-1 pt-2 space-y-2 grid grid-rows-4 " + (expanded ? "" : "hidden")}>
                        {pages.map((page) => (
                            <div className="relative">
                                <div className="text-sm font-semibold absolute right-12 top-0.5">{page.name}</div>
                                <MenubarItem
                                    slug={page.slug}
                                    name={page.name}
                                    pageName={pageName}
                                    setHover={() => {}}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-6 pt-1">
                    <MenubarItemLogout setHover={() => {}} />
                </div>
            </div>

            <div className="text-sm absolute right-56 top-6 font-semibold mt-0.5 mr-2">{hover}</div>
        </div>
    )
}

const MenubarItem = ({ slug, name, pageName, setHover }) => {
    const onHover = () => {
        setHover(name)
    }
    const onLeave = () => {
        setHover("")
    }

    return (
        <Link href={`/${slug}`} passHref>
            <div className="relative text-center justify-center w-6">
                <input
                    type="image"
                    className={
                        "w-6 cursor-pointer hover:opacity-80 pb-1 border-b-2 border-accent " +
                        (pageName === name ? "border-opacity-100" : "border-opacity-0")
                    }
                    src={`/images/${slug}.png`}
                    alt={slug}
                    onMouseEnter={onHover}
                    onMouseLeave={onLeave}
                />
            </div>
        </Link>
    )
}

const MenubarItemLogout = ({ setHover }) => {
    const onHover = () => {
        setHover("Logout")
    }
    const onLeave = () => {
        setHover("")
    }

    return (
        <a href="/api/auth/logout">
            <input
                type="image"
                className="w-6 cursor-pointer hover:opacity-80 pb-1 border-b-2 border-accent border-opacity-0"
                src="/images/logout.png"
                alt="logout"
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
            />
        </a>
    )
}

export default App
