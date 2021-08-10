const downloadRouter = require("express").Router()
const { Form } = require("../models/form")
const GenerateModel = require("../services/GenerateModel")

// GET - Download file
downloadRouter.get("/:id", (request, response) => {
    response.setHeader("content-type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    const readFile = __dirname + "/public/dcf_model_blank.xlsx"
    const writeFile = __dirname + `/downloads/${request.params.id}.xlsx`

    if (fs.existsSync(writeFile)) {
        try {
            fs.unlinkSync(writeFile)
        } catch (error) {
            console.log(error)
        }
    }

    Form.find({}).then((form) => {
        GenerateModel(form, readFile, writeFile, response, request)
    })
})

module.exports = downloadRouter
