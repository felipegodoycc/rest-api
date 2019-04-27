const functions = require('firebase-functions');
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const mongooseConfig = { useNewUrlParser: true }

const { username,password } = functions.config().mongo

const mongouri = 
    `mongodb+srv://soporte:${password}@cluster0-2vq26.gcp.mongodb.net/test?retryWrites=true`

mongoose.connect(mongouri,mongooseConfig)

const app = express()

const Pets = require("./pets")

const createServer = () => {
    app.use(cors({ origin: true}))

    app.get("/pets", async (req,res) => {
        const resultado = await Pets.find({}).exec()
        res.send(resultado)
    })

    app.post("/pets", async (req,res) => {
        const { body } = req

        const pet = new Pets(body)
        await pet.save()

        res.sendStatus(204)
    })
    
    app.get("/pets/:id/daralta", async (req,res) => {
        const { id } = req.params
        await Pets.deleteOne({ _id: id}).exec()
        res.sendStatus(204)
    })

    return app
}
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.api = functions.https.onRequest(createServer());
