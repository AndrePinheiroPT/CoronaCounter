const express = require('express')
const app = express()
const hospital = require('./routes/hospital')
const handlebars = require('express-handlebars')
const path = require('path')
const Sequelize = require('sequelize')
const db = require('./config/connection')
const bodyparser = require('body-parser')
const hospitals = require('./models/hospitals')
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

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/hospital',
    failureRedirect: '/login',
    failureFlash: true
}))

app.post('/register', (req, res) => {
    const errors = checkers.checkParams(
        req.body.name,
        req.body.password
    )
    if(errors.length == 0){
        hospitals.findAll({
            where: {
                name: req.body.name
            },
            raw: true
        }).then(hosp => {
            if(hosp.length == 0){
                try{
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(req.body.password, salt, function(err, hash) {
                            hospitals.create({
                                name: req.body.name,
                                password: hash
                            })
                        })
                    })
                    
                    res.redirect('/login')
                }catch(error){
                    res.redirect('/register')
                    console.log(error) 
                }
            }else{
                req.flash('error_msg', {text: 'This hospital already exists!'})
                res.redirect('/register')
            }
        }).catch(error => {
            console.log(`> Error to find names: ${error}`)
        })
    }else{
        req.flash('error_msg', errors)
        for(const id in errors){
            console.log(errors[id].text)
        }
        res.redirect('/register')
    }
})

// Server
app.listen(2020, () => {
    console.log(`> Running server in port 2020`)
})