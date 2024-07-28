import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Videos from './dbModel.js'

//App Config
const app = express()
const port = process.env.PORT || 9000
const connection_url = 'mongodb+srv://admin:admin@cluster0.jgaxjif.mongodb.net/dbTiktok'

//Middlewares
app.use(express.json())
app.use(Cors())

//DB Config
mongoose.connect(connection_url, { useUnifiedTopology: true })

//API endpoint
app.get("/", (req, res) => res.status(200).send("Tiktok clone"))

app.post('/v2/posts', (req, res) => {
    const dbVideos = req.body
    Videos.create(dbVideos, (err, data) => {
        if(err)
            res.status(500).send(err)
        else
            res.status(201).send(data)
    })
})

app.get('/v2/posts', (req, res) => {
    Videos.find((err, data) => {
        if(err)
            res.status(500).send(err)
        else
            res.status(200).send(data)
    })
})

//Listen
app.listen(port, () => console.log(`Listening on port - ${port}`))