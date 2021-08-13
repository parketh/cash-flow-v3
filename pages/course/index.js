import React from "react"
import matter from "gray-matter"
import ReactMarkdown from "react-markdown"
import Link from "next/link"

import DefaultLayout from "@Layouts/DefaultLayout"

const PostTemplate = ({ content }) => {
    return (
        <DefaultLayout>
            <article className="prose prose-2xl">
                <ReactMarkdown children={content} className="bodyTextTutorial" />
            </article>
            <div className="flex align-middle space-x-2">
                <span className="bodyTextTutorial">Let's get started!</span>
                <Link href={"/course/a-intro-1"} passHref>
                    <input className="w-6 h-6" type="image" src="/images/next.png" alt="next" />
                </Link>
            </div>
            <div className="mt-64"></div>
        </DefaultLayout>
    )
}

PostTemplate.getInitialProps = async () => {
    const content = await import(`~/static/coursepages/index.md`)

    // Parse .md data through `matter`
    const data = matter(content.default)

    // Pass data to our component props
    return { ...data }
}

export default PostTemplate
