//A Packages Requirements
const express = require('express')
const { json, urlencoded } = require('express')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const { config } = require('dotenv')
const cors = require('cors')

//Starting The App
const app = express()

//Environmental Configuration
config()

//Getting All Envrionmental Variabels
const port = process.env.PORT || 2000
const uri = process.env.URI

/**** Own Modules Requirement ****/
const { Connect } = require('./lib/Connect.js')

const mainRoute = require('./routes/mainRoute.js')
const authRoute = require('./routes/authRoute.js')
const dashRoute = require('./routes/dashRoute.js')

/********************************/

//Conneting DataBase
Connect(uri)

//Mouting Middlewares
app.use(helmet())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

//Mouting Routes
app.use('/', mainRoute)
app.use('/auth', authRoute)
app.use('/dashboard', dashRoute)

//Starting Server Listening
app.listen(port, () => { console.log(`[BOOTING]: Starting Server At ${port}`) })