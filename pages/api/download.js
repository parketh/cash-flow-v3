import { Form } from "@Models/form"
import GenerateModel from "@Services/GenerateModel"
import { existsSync, unlinkSync } from "fs"
import { join } from "path"

const downloadHandler = (request, response) => {
    if (request.method === "POST") {
        response.setHeader("content-type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        const readFile = join(__dirname, "../") + "/public/dcf_model_blank.xlsx"
        const writeFile = join(__dirname, "../") + `/downloads/${request.params.id}.xlsx`

        if (existsSync(writeFile)) {
            try {
                unlinkSync(writeFile)
            } catch (error) {
                console.log(error)
            }
        }

        Form.find({}).then((form) => {
            GenerateModel(form, readFile, writeFile, response, request)
        })
    } else {
        response.status(405).end(`Method ${request.method} not allowed.`)
    }
}

export default downloadHandler
