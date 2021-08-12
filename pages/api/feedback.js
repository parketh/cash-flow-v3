import Feedback from "@Models/feedback"

const feedbackHandler = async (request, response) => {
    if (request.method === "GET") {
        try {
            const feedback = await Feedback.find({}).populate("")
            response.json(feedback)
        } catch (error) {
            console.log(error)
        }
    } else {
        response.status(405).end(`Method ${request.method} not allowed.`)
    }
}

export default feedbackHandler
