import Feedback from "@Models/feedback"

const feedbackHandler = async (request, response) => {
    if (request.method === "GET") {
        try {
            const feedback = await Feedback.find({}).populate("")
            response.json(feedback)
        } catch (error) {
            console.log(error)
        }
    } else if (request.method === "POST") {
        const body = request.body

        if (body === undefined) {
            return response.status(400).json({ error: "content missing" })
        }

        const feedback = new Feedback(body)

        try {
            const savedResponse = await feedback.save()
            response.json(savedResponse)
        } catch (error) {
            console.log(error)
        }
    } else {
        response.status(405).end(`Method ${request.method} not allowed.`)
    }
}

export default feedbackHandler
