require("dotenv").config()
const express = require("express")
const next = require("next")
const cors = require("cors")

const {
    loginRouter,
    usersRouter,
    formsRouter,
    downloadRouter,
    feedbackRouter,
    coursePagesRouter,
} = require("./controllers")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    server.use(express.json())
    server.use(cors())

    server.use("/api/login", loginRouter)
    server.use("/api/users", usersRouter)
    server.use("/api/forms", formsRouter)
    server.use("/api/download", downloadRouter)
    server.use("/api/feedback", feedbackRouter)
    server.use("/api/coursepages", coursePagesRouter)

    server.get("*", (req, res) => {
        return handle(req, res)
    })

    const port = process.env.PORT
    server.listen(port, () => {
        console.log(`Running at localhost:${port}`)
    })
})
