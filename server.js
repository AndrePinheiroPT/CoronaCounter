const express = require('express')
const app = express()
const hospital = require('./routes/hospital')
const adm = require('./routes/adm')
const handlebars = require('express-handlebars')
const path = require('path')
const Sequelize = require('sequelize')
const db = require('./config/connection')
const bodyparser = require('body-parser')
const hospitals = require('./models/hospitals')
const peoples = require('./models/peoples')
const bcrypt = require('bcryptjs')
const checkers = require('./helpers/checkers')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const initializePassport = require('./config/auth')
initializePassport(passport)

// Configurations
    // Handlebars
        app.engine('handlebars', handlebars({
            defaultLayout: 'main'
        }))
        app.set('view engine', 'handlebars')
    // Static Files
        app.use(express.static(path.join(__dirname, 'public')))
    // Body-Parser
        app.use(bodyparser.urlencoded({extended: false}))
        app.use(bodyparser.json())
    // Session
        app.use(session({
            secret: 'sessionID',
            resave: true,
            saveUninitialized: true
        }))
    // PassPort
        app.use(passport.initialize())
        app.use(passport.session())
    // Flash
        app.use(flash())
    // Middlewares
        app.use((req, res, next) => {
            res.locals.error = req.flash('error')
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg')
            next()
        })
// Routes
app.use('/hospital', hospital)
app.use('/adm', adm)

app.get('/', (req, res) => {
    peoples.findAll({
        raw: true
    }).then(list => {
        let NPR = [0, 0, 0]
        for(const id in list){
            switch(list[id].state){
                case 'NEGATIVE':
                    NPR[0]++
                    break
                case 'POSITIVE':
                    NPR[1]++
                    break
                case 'RECOVERY':
                    NPR[2]++
                    break
            }
        }
        res.render('home',{
            registered: list.length,
            negative: NPR[0],
            positive: NPR[1],
            recovery: NPR[2]
        })
    })
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