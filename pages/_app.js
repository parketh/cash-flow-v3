import React, { useState, useRef, useEffect } from "react"
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
                <meta
                    name="keywords"
                    content="cash, flow, cash flow, finance, dcf, model, modelling, valuation, analysis, automation, automate, financial"
                />
                <meta
                    name="description"
                    content="Cash Flow is an automated financial modelling and analyst training platform that builds financial models in minutes, not weeks. Financial analysts can now build faster and learn valuation techniques at an accelerated pace. The platform also provides a free crash course for those new to valuation and financial modelling, lowering its barrier to entry."
                />
                <meta
                    name="subject"
                    content="The automated financial modelling and analyst training platform that allows you to build models in minutes, not weeks. "
                />
                <meta name="copyright" content="Cash Flow" />
                <meta name="Classification" content="Business" />
                <meta name="author" content="Park Yeung" />
                <meta name="url" content="https://cash-flow-app.vercel.app/" />
                <meta name="identifier-URL" content="https://cash-flow-app.vercel.app/" />
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
    const [formId, setFormId] = useState("")

    pageProps = { ...pageProps, formId: formId, setFormId: setFormId }

    if (isLoading) return <LoadingScreen />
    if (error) return <ErrorScreen error={error} />
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
                <img className="m-auto animate-bounce w-16 h-16" src="images/logo.png" />
            </div>
        </>
    )
}

const ErrorScreen = ({ error }) => {
    return (
        <>
            <div className="h-screen flex">
                <div className="m-auto font-semibold">{error.message}</div>
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
    const [expanded, setExpanded] = useState(false)
    const [hover, setHover] = useState("")
    const menuRef = useRef()

    const router = useRouter()
    const page = router.pathname.substring(router.pathname.lastIndexOf("/") + 1)
    const pageMap = {
        config: "Configuration",
        "[slug]": "Course",
        course: "Course",
        download: "Download",
        docs: "Documentation",
        starter: "Documentation",
        privacy: "Privacy",
    }

    let pageName = pageMap[page]

    const showTitle = page === "" ? true : false

    const handleClickMenu = (event) => {
        event.preventDefault()
        setExpanded(!expanded)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setExpanded(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [menuRef])

    const pages = [
        { id: 1, slug: "docs", name: "Documentation" },
        { id: 2, slug: "course", name: "Course" },
        { id: 3, slug: "config", name: "Configuration" },
        { id: 4, slug: "download", name: "Download" },
    ]

    return (
        <div className="bg-white h-auto px-6 py-4 w-full grid grid-cols-4 font-sans relative" ref={menuRef}>
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
            {/* Navbar for larger screens */}
            <div className="col-span-1 pt-2 space-x-2 sm:space-x-4 w-48 text-right justify-self-end justify-end hidden lg:flex">
                {pages.map((page) => (
                    <div key={page.id}>
                        <MenubarItem slug={page.slug} name={page.name} pageName={pageName} setHover={setHover} />
                    </div>
                ))}
                <MenubarItemProfile user={user} setHover={setHover} />
                <MenubarItemLogout setHover={setHover} />
            </div>
            {/* Navbar for smaller screens */}
            <div className="grid grid-cols-2 gap-x-5 justify-end justify-self-end lg:hidden mt-1">
                <div>
                    <input
                        type="image"
                        className="pt-1 w-6 opacity-60"
                        src="/images/menu.png"
                        alt="menu"
                        onClick={handleClickMenu}
                    />
                    <div
                        className={
                            "col-span-1 pt-2 space-y-2 grid grid-rows-4 text-gray-800 " + (expanded ? "" : "hidden")
                        }
                    >
                        <div className="relative">
                            <div className="text-sm font-semibold absolute right-12 text-right top-0.5 w-48">{`Welcome, ${user.name}!`}</div>
                            <MenubarItemProfile user={user} setHover={() => {}} />
                        </div>

                        {pages.map((page) => (
                            <div className="relative" key={page.id}>
                                <div className="text-sm font-semibold absolute text-right right-12 top-0.5">
                                    {page.name}
                                </div>
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
                <div className="mt-1">
                    <MenubarItemLogout setHover={() => {}} />
                </div>
            </div>

            <div className="text-sm absolute right-64 top-6 font-semibold mt-0.5 mr-2 text-gray-800">{hover}</div>
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

const MenubarItemProfile = ({ user, setHover }) => {
    const onHover = () => {
        setHover(`Welcome, ${user.name}!`)
    }
    const onLeave = () => {
        setHover("")
    }

    return (
        <img
            src={user.picture}
            alt={user.name}
            className="rounded-full img-fluid profile-picture w-6 h-6"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        />
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
                className="w-6 cursor-pointer hover:opacity-80 pb-1 border-b-2 border-opacity-0"
                src="/images/logout.png"
                alt="logout"
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
            />
        </a>
    )
}

export default App
