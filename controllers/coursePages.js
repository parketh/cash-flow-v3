const fs = require("fs")
const path = require("path")

const coursePagesRouter = require("express").Router()

// GET - get markdown files
coursePagesRouter.get("/:slug", (request, response) => {
    const filepath = path.join(__dirname, "../") + `/content/pages/${request.params.slug}.md`
    const file = fs.readFileSync(filepath, "utf8")
    response.send(file)
})

module.exports = coursePagesRouter
