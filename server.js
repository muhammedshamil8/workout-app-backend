require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const WorkouteRoutes = require('./routes/workouts')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', WorkouteRoutes)
// app.get('/', (req,res) => {res.send('Hello World')})

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for request
        app.listen(process.env.PORT, () => {
            console.log('connected to mongodb & listeneing on port ', process.env.PORT)
        })
    }).catch((err) => {
        console.log(err)
    })

