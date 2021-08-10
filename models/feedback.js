const mongoose = require("mongoose")

const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
})

feedbackSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

const Feedback = mongoose.model("Feedback", feedbackSchema)
module.exports = Feedback
