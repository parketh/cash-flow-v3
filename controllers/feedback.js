const feedbackRouter = require("express").Router()
const Feedback = require("../models/feedback")

// GET - View all feedback
feedbackRouter.get("/", async (request, response) => {
    try {
        const feedback = await Feedback.find({}).populate("")
        response.json(feedback)
    } catch (error) {
        console.log(error)
    }
})

// POST - leave feedback
feedbackRouter.post("/:id", (request, response) => {
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

module.exports = feedbackRouter
