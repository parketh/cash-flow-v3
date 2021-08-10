const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

// GET - retrieve list of all users
usersRouter.get("/", async (request, response) => {
    try {
        const user = await User.find({}).populate("forms")
        response.json(user)
    } catch (error) {
        console.log(error)
    }
})

// POST - create new user
usersRouter.post("/", async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter
