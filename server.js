const express = require('express')
const app = express()

const PeopleController = require('./src/controllers/PeopleController')
const peopleController = new PeopleController

const hospital = require('./src/routes/hospital')
const adm = require('./src/routes/adm')
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
app.use('/hospital', hospital)
app.use('/adm', adm)

app.get('/', peopleController.index)

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