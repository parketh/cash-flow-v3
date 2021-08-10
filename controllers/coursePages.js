const coursePagesRouter = require("express").Router()

// GET - get markdown files
coursePagesRouter.get("/:slug", (request, response) => {
    const path = __dirname + `/content/pages/${request.params.slug}.md`
    const file = fs.readFileSync(path, "utf8")
    response.send(file)
})

module.exports = coursePagesRouter
