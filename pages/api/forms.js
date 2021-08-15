import { Form } from "@Models/form"
import User from "@Models/user"

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
        if (body === undefined) {
            return response.status(400).json({ error: "content missing" })
        }

        const user = await User.findById(body.user)

        if (!user) {
            console.log("No form found for user!")
        }

        const form = new Form({ ...body })
        const savedResponse = await form.save()
        user.forms = user.forms.concat(savedResponse.id)
        await user.save()

        response.json(savedResponse)
    }
}

export default formsHandler
