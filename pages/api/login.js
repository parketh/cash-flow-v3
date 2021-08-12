import { sign } from "jsonwebtoken"
import { compare } from "bcrypt"
import { findOne } from "@Models/user"

const loginHandler = async (request, response) => {
    if (request.method === "POST") {
        const body = request.body

        const user = await findOne({ username: body.username })
        const passwordCorrect = user === null ? false : await compare(body.password, user.passwordHash)

        if (!(user && passwordCorrect)) {
            return response.status(401).json({
                error: "invalid username or password",
            })
        }

        const userForToken = {
            username: user.username,
            id: user._id,
        }

        // token expires in 60*60 seconds, that is, in one hour
        const token = sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })

        response.status(200).send({ token, username: user.username, name: user.name })
    } else {
        response.status(405).end(`Method ${request.method} not allowed.`)
    }
}

export default loginHandler
