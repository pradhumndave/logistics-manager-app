require('dotenv').config()
require('./db/mongoose')
const path = require('path')
const cors = require('cors');
const bodyparser = require('body-parser');

const express = require('express')
const rigRouter = require('./routers/rig')

const app = express()
const PORT = 8000 || process.env.PORT

app.use(express.json())
app.use(rigRouter)
app.use(bodyparser.urlencoded({ extended: false }))
app.use(cors())
app.set("view engine", "ejs");
app.set('views', './public');

const publicDirectoryPath = path.join(__dirname, "./public");
// const viewsPath = path.join(__dirname, "../client/templates/views");
// const partialsPath = path.join(__dirname, "../client/templates/partials");

app.use(express.static(publicDirectoryPath));


app.listen(PORT, ()=>{
    console.log(`App is running on ${PORT}`)
})