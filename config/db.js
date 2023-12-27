//dependencies

//bring in mongoose
const mongoose = require("mongoose")

//connect to database
mongoose.connect(process.env.DATABASE_URL)

//connection status listeners

//for an error
mongoose.connection.on("error", (err) => console.log(err.message + "There appears to be an error"))

//connected
mongoose.connection.on("connected", () => console.log("mongoose is running"))

//disconnected
mongoose.connection.on("disconnected", () => console.log("disconnected from the mongoose"))