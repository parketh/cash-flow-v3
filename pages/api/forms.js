import { verify } from "jsonwebtoken"
import { Form } from "@Models/form"
import { findById } from "@Models/user"

const getTokenFrom = (request) => {
    const authorization = request.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        const decodedToken = verify(authorization.substring(7), process.env.SECRET)
        return decodedToken
    }
    return null
}

const formsHandler = async (request, response) => {
    if (request.method === "GET") {
        try {
            const form = await Form.find({}).populate("user", { username: 1, name: 1, id: 1 })
            response.json(form)
        } catch (error) {
            console.log(error)
        }
    } else if (request.method === "POST") {
        const body = request.body

        const decodedToken = getTokenFrom(request)

        if (!decodedToken || !decodedToken.id) {
            return response.status(401).json({ error: "token missing or invalid" })
        }
        const user = await findById(decodedToken.id)

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
    }
}

export default formsHandler
