import { Form } from "@Models/form"
import { existsSync, unlinkSync } from "fs"
import path from "path"
import getConfig from "next/config"

import generateModel from "~/services/generateModel"

const downloadHandler = (request, response) => {
    const {
        query: { id },
        method,
    } = request

    if (method === "GET") {
        response.setHeader("content-type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        const readFile = path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, "static/dcf_model_blank.xlsx")
        const writeFile = path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, `downloads/${id}.xlsx`)

        if (existsSync(writeFile)) {
            try {
                unlinkSync(writeFile)
            } catch (error) {
                console.log(error)
            }
        }

        Form.find({}).then((form) => {
            generateModel(form, readFile, writeFile, response, request)
        })
    } else {
        response.status(405).end(`Method ${request.method} not allowed.`)
    }
}

export default downloadHandler
