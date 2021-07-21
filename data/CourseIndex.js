const CourseTopics = [
    {
        index: 0,
        name: 'Introduction',
        slug: 'intro',
        numPages: 8
    },
    {
        index: 1,
        name: 'Valuation framework',
        slug: 'framework',
        numPages: 5
    },
    {
        index: 2,
        name: 'Market of operation (E1)',
        slug: 'market',
        numPages: 5
    },
    {
        index: 3,
        name: 'Competition (E2)',
        slug: 'competition',
        numPages: 2
    },
    {
        index: 4,
        name: 'Business model (E3)',
        slug: 'business',
        numPages: 6
    },
    {
        index: 5,
        name: 'Costs (E4)',
        slug: 'costs',
        numPages: 0
    },
    {
        index: 6,
        name: 'Stage of growth (E5)',
        slug: 'growth',
        numPages: 0
    },
    {
        index: 7,
        name: 'Risk factors (E6)',
        slug: 'risks',
        numPages: 0
    },
    {
        index: 8,
        name: 'Financing (E7)',
        slug: 'financing',
        numPages: 0
    },
]


const numToLetter = (n) => {
    let result = ''
    do {
        result = (n % 26 + 10).toString(36) + result
        n = Math.floor(n / 26) - 1
    } while (n >= 0)

    return result
}

const CourseIndex = CourseTopics.map(topic => {
    let pages = ['index']
    for (let i = 1; i <= topic.numPages; i++) {
        pages.push(numToLetter(topic.index) + '-' + topic.slug + '-' + i)
    }
    return pages
}).flat()


module.exports = {
    CourseTopics: CourseTopics,
    CourseIndex: CourseIndex
}