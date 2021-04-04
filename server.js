const express = require('express')
const app = express()
const mainRoute = require('./src/routes')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')

// Configurations
    // Static Files
        app.use(express.static(path.join(__dirname, 'public')))
    // Session
        app.use(session({
            secret: 'sessionID',
            resave: true,
            saveUninitialized: true
        }))
    // BodyParser
        app.use(bodyParser.json()) // for parsing application/json
        app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/api', mainRoute)

// Server
app.listen(2020, () => {
    console.log(`> Running server in port 2020`)
})