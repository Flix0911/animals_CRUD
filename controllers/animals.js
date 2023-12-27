//dependencies

//bring in express
const express = require("express")

//create router variable to eventually export
const router = express.Router()

//import Animals model
const Animal = require("../models/Animal")

//--------------------------------------------
//ROUTES

//INDEX - GET - Brings to index page
router.get("/", async (req, res) => {
    //find all animals in db
    let animals = await Animal.find({})
    //render all of animals to index.ejs
    res.render("index.ejs", {animals})
})

//NEW - GET - Brings to the form to make a NEW animal
router.get("/new", (req, res) => {
    //bring the user to the new.ejs page to make a NEW animal
    res.render("new.ejs")
})


//DELETE - DELETE - Remove the animal that was clicked to remove
router.delete("/:id", async (req, res) => {
    try {
        //find the animal and then delete
        let deletedAnimal = await Animal.findByIdAndDelete(req.params.id)
        //show as this occurs
        console.log(deletedAnimal)
        //redirect to index
        res.redirect("/animals")
    } catch (error) {
        res.status(500).send("The animal won't delete")
    }
})

//UPDATE - PUT - Return updated notes to the ._id indicated
router.put("/:id", async (req, res) => {
    try {
        if (req.body.extinct === "on") {
            //if checked, as per below
            req.body.extinct = true
        } else {
            //if not checked
            req.body.extinct = false
        }
        //find by id and update the req.body
        let updatedAnimal = await Animal.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }
    )
    //redirect to show.ejs
    res.redirect(`/animals/${updatedAnimal._id}`)
    } catch (err) {
        res.send(err)
    }
})

//CREATE - POST - Return back to Index with the newly created animal
router.post("/", async (req, res) => {
    try {
        if (req.body.extinct === "on") {
            //if checked
            req.body.extinct = true
        } else {
            //if not checked
            req.body.extinct = false
        }
        let discoveredAnimal = await Animal.create(req.body)
        res.redirect("/animals")
    } catch (err) {
        res.send(err)
    }
})

//EDIT - GET - Bring to edit.ejs from show.ejs by a button
router.get("/edit/:id", async (req, res) => {
    try {
        //find the animal by ID and edit
        let foundAnimal = await Animal.findById(req.params.id)
        //send to edit.ejs
        res.render("edit.ejs", {animal: foundAnimal})
    } catch (error) {
        res.send("somethin ain't right")
    }
})

//SHOW - GET - Bring to show.ejs from the animal I clicked on by ID
router.get("/:id", async (req, res) => {
    //find the animal by the _id
    let foundAnimal = await Animal.findById(req.params.id)
    //log as we move to the page
    console.log(foundAnimal)
    //bring to show.ejs
    res.render("show.ejs", {animal: foundAnimal})
})

//--------------------------------------------
//Export the router
module.exports = router