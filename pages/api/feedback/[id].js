import Feedback from "@Models/feedback"

const feedbackHandler = async (request, response) => {
    const {
        query: { id },
        method,
    } = request
    console.log(id)

    switch (method) {
        case "GET":
            try {
                const feedback = await Feedback.findById(id)
                response.json(feedback)
            } catch (error) {
                console.log(error)
            }
            break
        case "POST":
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
            break
        default:
            response.status(405).end(`Method ${request.method} not allowed.`)
    }
}

export default feedbackHandler
