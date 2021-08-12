const jwt = require("jsonwebtoken")

const formsRouter = require("express").Router()
const { Form, Comp } = require("../models/form")
const User = require("../models/user")

const getTokenFrom = (request) => {
    const authorization = request.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)
        return decodedToken
    }
    return null
}

// GET - retrieve all forms
formsRouter.get("/", async (request, response) => {
    try {
        form = await Form.find({}).populate("user", { username: 1, name: 1, id: 1 })
        response.json(form)
    } catch (error) {
        console.log(error)
    }
})

// GET - retrive a specific forms by id
formsRouter.get("/:id", (request, response) => {
    Form.findById(request.params.id)
        .then((form) => {
            response.json(form)
        })
        .catch((error) => {
            console.error(error)
        })
})

// POST - create a new form
formsRouter.post("/", async (request, response) => {
    const body = request.body

    const decodedToken = getTokenFrom(request)

    if (!decodedToken || !decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" })
    }
    const user = await User.findById(decodedToken.id)

    if (body === undefined) {
        return response.status(400).json({ error: "content missing" })
    }

    const form = new Form({
        ...body,
        user: user._id,
    })

    const savedResponse = await form.save()
    user.forms = user.forms.concat(savedResponse._id)
    await user.save()

    response.json(savedResponse)
})

// DELETE - delete a specific form by id
formsRouter.delete("/:id", (request, response, next) => {
    Form.findByIdAndRemove(request.params.id)
        .then((result) => {
            response.status(204).end()
        })
        .catch((error) => next(error))
})

// PUT - update a specific form by id
formsRouter.put("/:id", (request, response, next) => {
    const body = request.body

    Form.findByIdAndUpdate(request.params.id, body, { new: true, upsert: true, setDefaultsOnInsert: true })
        .then((updatedResponse) => {
            response.json(updatedResponse)
        })
        .catch((error) => next(error))
})

module.exports = formsRouter
