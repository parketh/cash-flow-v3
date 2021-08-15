import User from "@Models/user"

const usersHandler = async (request, response) => {
    if (request.method === "GET") {
        try {
            const users = await User.find({})
            response.json(users)
        } catch (error) {
            console.log(error)
        }
    } else if (request.method === "POST") {
        const body = request.body

        const user = new User({ ...body })

        const savedUser = await user.save()

        response.json(savedUser)
    } else {
        response.status(405).end(`Method ${request.method} not allowed.`)
    }
}

export default usersHandler
