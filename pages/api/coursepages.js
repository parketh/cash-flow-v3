import { readFileSync } from "fs"
import { join } from "path"

const coursePagesHandler = (request, response) => {
    const {
        query: { id },
        method,
    } = request
    
    if (method === "GET") {
        const filepath = join(__dirname, "../") + `/content/pages/${id}.md`
        const file = readFileSync(filepath, "utf8")
        response.send(file)
    } else {
        response.status(405).end(`Method ${request.method} not allowed.`)
    }
}

export default coursePagesHandler
