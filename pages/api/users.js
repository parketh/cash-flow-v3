import { hash } from "bcrypt"
import User from "@Models/user"

const usersHandler = async (request, response) => {
    if (request.method === "GET") {
        try {
            const user = await User.find({}).populate("forms")
            response.json(user)
        } catch (error) {
            console.log(error)
        }
    } else if (request.method === "POST") {
        const body = request.body

        const saltRounds = 10
        const passwordHash = await hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()

        response.json(savedUser)
    } else {
        response.status(405).end(`Method ${request.method} not allowed.`)
    }
}

export default usersHandler
