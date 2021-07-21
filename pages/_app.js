import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import '../styles/index.css'

const App = ({ Component, pageProps }) => {
  return (
    <div className="flex flex-col h-screen">
      <Menubar />
      <Component {...pageProps} />
    </div>
  )
}

const Menubar = () => {
  const router = useRouter()
  const page = router.pathname.substring(router.pathname.lastIndexOf('/') + 1)
  let pageName = page.charAt(0).toUpperCase() + page.slice(1)
  pageName = pageName === 'Config' ? 'Configuration' : pageName
  pageName = pageName === '[slug]' ? 'Course' : pageName
  
  const showTitle = page === '' ? true : false

  return (
    <div className="bg-white h-auto px-6 py-4 w-full grid grid-cols-4 sticky">
        <div className="col-span-1 flex space-x-4 w-48">
            <Link href='/' passHref><input type="image" className="mt-1 h-7 cursor-pointer" src='/images/logo.png' alt="logo" /></Link>
            <span className="mt-1 text-lg text-theme font-semibold" >{showTitle ? "Cash Flow" : ""}</span>
        </div>
        <div className="col-span-2 text-center pt-1">
            <span className="text-theme text-xl font-semibold">{pageName}</span>
        </div>
        <div className="col-span-1 pt-1 space-x-2 sm:space-x-4 w-36 text-right justify-self-end items-center">
            <Link href='/course' passHref><input type="image" className="w-6 mx-1 cursor-pointer" src='/images/course.png' alt="config" /></Link>
            <Link href='/config' passHref><input type="image" className="w-6 cursor-pointer" src='/images/settings.png' alt="config" /></Link>
            <Link href='/download' passHref><input type="image" className="w-6 cursor-pointer" src='/images/download.png' alt="download" /></Link>
        </div>
    </div>
  )
}

export default App