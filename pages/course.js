import React from 'react'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

const PostTemplate = ({ content }) => {
    return (
        <div className="overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-50 scrollbar-w-2 scrollbar-thumb-rounded-full">
            <div className="h-auto w-full px-5 py-5 space-y-2 flex justify-center">
                <div className="w-768">
                    <article className="prose prose-2xl">
                        <ReactMarkdown children={content} className="bodyTextTutorial" />
                    </article>
                    <div className="flex align-middle space-x-2">
                        <span className="bodyTextTutorial" >Let's get started!</span>
                        <Link href={'/course/a-intro-1'} passHref>
                            <input className="w-6 h-6" type="image" src="/images/next.png" alt="next" />
                        </Link>
                    </div>
                    <div className="mt-64"></div>
                </div>
            </div>
        </div>
    )
}

PostTemplate.getInitialProps = async () => {
    const content = await import(`../content/pages/index.md`)

    // Parse .md data through `matter`
    const data = matter(content.default)
    
    // Pass data to our component props
    return { ...data }
}

export default PostTemplate