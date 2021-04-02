const express = require('express')
const app = express()
const mainRoute = require('./src/routes')

const path = require('path')
const session = require('express-session')
const passport = require('passport')
const initializePassport = require('./config/auth')
initializePassport(passport)

// Configurations
    // Static Files
        app.use(express.static(path.join(__dirname, 'public')))
    // Session
        app.use(session({
            secret: 'sessionID',
            resave: true,
            saveUninitialized: true
        }))
    // PassPort
        app.use(passport.initialize())
        app.use(passport.session())

// Routes
app.use('/', mainRoute)

app.get('/', (req, res) => {
    res.redirect('/peoples')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/hospital',
    failureRedirect: '/login',
    failureFlash: true
}))

// Server
app.listen(2020, () => {
    console.log(`> Running server in port 2020`)
})