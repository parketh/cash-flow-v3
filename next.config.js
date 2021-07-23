const { CourseIndex } = require('./data/CourseIndex')

module.exports = {
    exportPathMap: async (defaultPathMap) => {
        let pathMap = {
            '/': { page: '/' },
            '/config': { page: '/config'},
            '/download': { page: '/download' },
            '/course': { page: '/course'},
        }

        const coursePages = CourseIndex.shift()
        coursePages.map(page => {
            pathMap[`/course/${page}`] = { page: '/course', query: { slug: page } }
        })

        return pathMap
    },    
    webpack: (config) => {
        config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
        })
        return config
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
}