//dependencies

//use .env variables
require("dotenv").config()
//db config
require("./config/db")

//express
const express = require("express")

//morgan
const morgan = require("morgan")

//method-override
const methodOverride = require("method-override")

//express application
const app = express()
//port
const { PORT = 3013 } = process.env

//import Animals model
const Animal = require("./models/Animal")

//--------------------------------------------
//middleware

//morgan logger
app.use(morgan("dev"))

//access to req.body
app.use(express.urlencoded({ extended: true}))

//method-override - allow access to DELETE and PUT
app.use(methodOverride("_method"))

//add styles.css
app.use("/public", express.static("public"))

//--------------------------------------------
//routes

//INDEX - GET - Brings to index page
app.get("/animals", async (req, res) => {
    //find all animals in db
    let animals = await Animal.find({})
    //render all of animals to index.ejs
    res.render("index.ejs", {animals})
})

//NEW - GET - Brings to the form to make a NEW animal
app.get("/animals/new", (req, res) => {
    //bring the user to the new.ejs page to make a NEW animal
    res.render("new.ejs")
})


//DELETE - DELETE

//UPDATE - PUT

//CREATE - POST - Return back to Index with the newly created animal
app.post("/animals", async (req, res) => {
    try {
        if (req.body.completed === "on") {
            //if checked
            req.body.completed = true
        } else {
            //if not checked
            req.body.completed = false
        }
        let discoveredAnimal = await Animal.create(req.body)
        res.redirect("/animals")
    } catch (err) {
        res.send(err)
    }
})

//EDIT - GET

//SHOW - GET

//--------------------------------------------
//server listener
app.listen(PORT, () => console.log(`Running on ${PORT}`))