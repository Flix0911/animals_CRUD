//dependencies

//bring in mongoose
const mongoose = require("mongoose")

//create schema
const animalsSchema = new mongoose.Schema ({
    species: { type: String, required: true },
    location: { type: String, required: true},
    lifeExpectancy: { type: Number, required: true },
    extinct: Boolean
})

//create variable to then export
const Animal = mongoose.model("Animal", animalsSchema)

//export out
module.exports = Animal