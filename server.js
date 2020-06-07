const express = require('express')
const app = express()
const hospital = require('./routes/hospital')
const adm = require('./routes/adm')
const handlebars = require('express-handlebars')
const path = require('path')
const bodyparser = require('body-parser')
const peoples = require('./models/peoples')
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

        let state = {
            negative: 0,
            positive: 0,
            recovery: 0
        }

        for(const id in list){
            switch(list[id].state){
                case 'NEGATIVE':
                    state.negative++
                    break
                case 'POSITIVE':
                    state.positive++
                    break
                case 'RECOVERY':
                    state.recovery++
                    break
            }
        }
        res.render('home',{
            registered: list.length,
            negative: state.negative,
            positive: state.positive,
            recovery: state.recovery
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