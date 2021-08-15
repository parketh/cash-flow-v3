const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const url = process.env.MONGODB_URI

console.log("connecting to", url)

mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then((result) => {
        console.log("connected to MongoDB")
    })
    .catch((error) => {
        console.log("error connecting to MongoDB:", error.message)
    })

const userSchema = new mongoose.Schema({
    auth0UserId: {
        type: String,
        unique: true,
    },
    name: String,
    email: String,
    forms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Form",
        },
    ],
})

userSchema.plugin(uniqueValidator)

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    },
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

module.exports = User
