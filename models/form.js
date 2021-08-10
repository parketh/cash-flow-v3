const mongoose = require("mongoose")

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

const compSchema = new mongoose.Schema({
    name: String,
    ciqId: String,
})

const formSchema = new mongoose.Schema({
    companyName: String,
    ciqId: String,
    valDate: Date,
    curr: String,
    finYearEnd: Date,
    histStart: Number,
    histEnd: Number,
    restatementType: String,
    filingMode: String,
    convMode: String,
    forecastModel: String,
    useCiqForecast: String,
    forecastStart: Number,
    forecastEnd: Number,
    g: Number,
    discRateApproach: String,
    rf: Number,
    preTaxRd: Number,
    debtRatio: Number,
    t: Number,
    rOverride: mongoose.Mixed,
    betaDate: Date,
    gearingMeasure: String,
    index: String,
    erp: Number,
    comps: [compSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
})

const schemas = [compSchema, formSchema]

schemas.forEach((s) => {
    s.set("toJSON", {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
        },
    })
})

module.exports = {
    Form: mongoose.model("Form", formSchema),
    Comp: mongoose.model("Comp", compSchema),
}
