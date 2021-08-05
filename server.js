require("dotenv").config()
const express = require("express")
const next = require("next")
const cors = require("cors")
const fs = require("fs")

const GenerateModel = require("./services/GenerateModel")
const { Form, Comp, Feedback } = require("./models/form")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    server.use(express.json())
    server.use(cors())

    // GET - retrive all responses
    server.get("/responses", (request, response) => {
        Form.find({})
            .then((form) => {
                response.json(form)
            })
            .catch((error) => {
                console.error(error)
            })
    })

    // GET - retrive a specific response by id
    server.get("/responses/:id", (request, response) => {
        Form.findById(request.params.id)
            .then((form) => {
                response.json(form)
            })
            .catch((error) => {
                console.error(error)
            })
    })

    // POST - create a new response
    server.post("/responses", (request, response) => {
        const body = request.body

        if (body === undefined) {
            return response.status(400).json({ error: "content missing" })
        }

        const form = new Form(body)

        form.save()
            .then((savedResponse) => {
                response.json(savedResponse)
            })
            .catch((error) => {
                console.error(error)
            })
    })

    // DELETE - delete a response
    server.delete("/responses/:id", (request, response, next) => {
        Form.findByIdAndRemove(request.params.id)
            .then((result) => {
                response.status(204).end()
            })
            .catch((error) => next(error))
    })

    // PUT - update a response
    server.put("/responses/:id", (request, response, next) => {
        const body = request.body

        Form.findByIdAndUpdate(request.params.id, body, { new: true, upsert: true, setDefaultsOnInsert: true })
            .then((updatedResponse) => {
                response.json(updatedResponse)
            })
            .catch((error) => next(error))
    })

    // GET - retrive all comparable companies for response of id
    server.get("/responses/:id/comps", (request, response) => {
        Form.findById(request.params.id)
            .then((form) => {
                response.json(form.comps)
            })
            .catch((error) => {
                console.error(error)
            })
    })

    // POST - create a new comparable company
    server.post("/responses/:id/comps", (request, response, next) => {
        const body = request.body
        if (body === undefined) {
            return response.status(400).json({ error: "content missing" })
        }

        let newComp = new Comp(body)
        Form.findById(request.params.id)
            .then((existingForm) => {
                existingForm.comps.push(newComp)
                existingForm.save()
                response.json(existingForm.comps)
            })
            .catch((error) => next(error))
    })

    // DELETE - delete a comparable company
    server.delete("/responses/:id/comps/:compId", (request, response, next) => {
        Form.findById(request.params.id)
            .then((existingForm) => {
                existingForm.comps = existingForm.comps.filter((comp) => comp.id !== request.params.compId)
                existingForm.save()
                response.status(204).end()
            })
            .catch((error) => next(error))
    })

    // PUT - update a comparable company
    server.put("/responses/:id/comps/:compId", (request, response, next) => {
        const body = request.body
        if (body === undefined) {
            return response.status(400).json({ error: "content missing" })
        }

        Form.findById(request.params.id)
            .then((existingForm) => {
                const existingComps = existingForm.comps
                existingComps.forEach((comp) => {
                    if (comp.id === request.params.compId) {
                        comp.name = body.name
                        comp.ciqId = body.ciqId
                    }
                })
                existingForm.save()
                response.json(existingForm.comps)
            })
            .catch((error) => next(error))
    })

    // GET - Download file
    server.get("/download/:id", (request, response) => {
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

    // POST - leave feedback
    server.post("/feedback/:id", (request, response, next) => {
        const body = request.body

        if (body === undefined) {
            return response.status(400).json({ error: "content missing" })
        }

        const feedback = new Feedback(body)

        feedback
            .save()
            .then((savedResponse) => {
                response.json(savedResponse)
            })
            .catch((error) => {
                console.error(error)
            })
    })

    // GET - View feedback
    server.get("/feedback", (request, response) => {
        Feedback.find({})
            .then((feedback) => {
                response.json(feedback)
            })
            .catch((error) => {
                console.error(error)
            })
    })

    // GET - get markdown files
    server.get("/coursepages/:slug", (request, response) => {
        const path = __dirname + `/content/pages/${request.params.slug}.md`
        const file = fs.readFileSync(path, "utf8")
        response.send(file)
    })

    server.get("*", (req, res) => {
        return handle(req, res)
    })

    const port = process.env.PORT
    server.listen(port, () => {
        console.log(`Running at localhost:${port}`)
    })
})
