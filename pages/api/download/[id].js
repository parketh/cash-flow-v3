import { Form } from "@Models/form"
import { existsSync, unlinkSync } from "fs"
import { tmpdir } from "os"
import path from "path"

import generateModel from "~/services/generateModel"

const downloadHandler = (request, response) => {
    const {
        query: { id },
        method,
    } = request

    if (method === "GET") {
        let basePath = process.cwd()
        if (process.env.NODE_ENV === "production") {
            basePath = path.join(process.cwd(), ".next/server/chunks")
        }
        const readFile = path.join(basePath, "content/dcf_model_blank.xlsx")
        const writeFile =
            process.env.NODE_ENV === "production"
                ? path.join(tmpdir(), `${id}.xlsx`)
                : path.join(basePath, `downloads/${id}.xlsx`)

        if (existsSync(writeFile)) {
            try {
                unlinkSync(writeFile)
            } catch (error) {
                console.log(error)
            }
        }

        Form.findById(id)
            .then((form) => {
                generateModel(form, readFile, writeFile, response, request)
            })
            .catch((error) => console.error(error))
    } else {
        response.status(405).end(`Method ${request.method} not allowed.`)
    }
}

export default downloadHandler
