//dependencies

//use .env variables
require("dotenv").config()

//express
const express = require("express")

//morgan
const morgan = require("morgan")

//method-override
const methodOverride = require("method-override")

//application
const app = express()
//port
const { PORT = 3013 } = process.env

//middleware

//morgan logger
app.use(morgan("dev"))

//access to req.body
app.use(express.urlencoded({ extended: true}))

//method-override - allow access to DELETE and PUT
app.use(methodOverride("_method"))

//server listener
app.listen(PORT, () => console.log(`Running on ${PORT}`))