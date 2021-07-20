import React from 'react'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'

const PostTemplate = ({ content }) => {
    const loc = window.location.pathname;
    const dir = loc.substring(0, loc.lastIndexOf('/'))
    console.log(dir)
    
    return (
        <div className="overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-50 scrollbar-w-2 scrollbar-thumb-rounded-full">
            <div className="h-auto w-full px-5 py-5 space-y-2 flex justify-center">
                <div className="w-768">
                    <article className="prose prose-2xl">
                        <ReactMarkdown children={content} className="bodyTextTutorial" />
                    </article>
                    <div className="mt-64"></div>
                </div>
            </div>
        </div>
    )
}

PostTemplate.getInitialProps = async (context) => {
    const { slug } = context.query
    
    // Import our .md file using the `slug` from the URL
    const content = await import(`../../content/pages/${slug}.md`)

    // Parse .md data through `matter`
    const data = matter(content.default)
    
    // Pass data to our component props
    return { ...data }
}

export default PostTemplate