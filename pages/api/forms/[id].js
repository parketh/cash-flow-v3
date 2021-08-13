import { Form } from "@Models/form"

const formHandler = (request, response) => {
    const {
        query: { id },
        method,
    } = request

    switch (method) {
        case "GET":
            Form.findById(id)
                .then((form) => {
                    response.json(form)
                })
                .catch((error) => {
                    console.error(error)
                })
            break
        case "DELETE":
            Form.findByIdAndRemove(id)
                .then((result) => {
                    response.status(204).end()
                })
                .catch((error) => next(error))
            break
        case "PUT":
            const body = request.body

            Form.findByIdAndUpdate(id, body, { new: true, upsert: true, setDefaultsOnInsert: true })
                .then((updatedResponse) => {
                    response.json(updatedResponse)
                })
                .catch((error) => next(error))
            break
        default:
            response.status(405).end(`Method ${request.method} not allowed.`)
    }
}

export default formHandler

export const config = {
    api: {
        externalResolver: true,
    },
}
