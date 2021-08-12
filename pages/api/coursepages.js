import { readFileSync } from "fs"
import { join } from "path"

const coursePagesHandler = (request, response) => {
    if (request.method === "GET") {
        const filepath = join(__dirname, "../") + `/content/pages/${request.params.slug}.md`
        const file = readFileSync(filepath, "utf8")
        response.send(file)
    } else {
        response.status(405).end(`Method ${request.method} not allowed.`)
    }
}

coursePagesRouter.get("/:slug", (request, response) => {
    const filepath = join(__dirname, "../") + `/content/pages/${request.params.slug}.md`
    const file = readFileSync(filepath, "utf8")
    response.send(file)
})

export default coursePagesHandler
