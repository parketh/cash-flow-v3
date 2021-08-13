import { readFileSync } from "fs"
import path from "path"
import getConfig from "next/config"

const coursePagesHandler = (request, response) => {
    const {
        query: { id },
        method,
    } = request

    if (method === "GET") {
        const filepath = path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, `static/coursepages/${id}.md`)
        const file = readFileSync(filepath, "utf8")
        response.send(file)
    } else {
        response.status(405).end(`Method ${request.method} not allowed.`)
    }
}

export default coursePagesHandler
