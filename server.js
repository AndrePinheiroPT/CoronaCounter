const express = require('express')
const app = express()
const hospital = require('./routes/hospital')
const handlebars = require('express-handlebars')
const path = require('path')
const Sequelize = require('sequelize')
const db = require('./config/connection')
const bodyparser = require('body-parser')
const hospitals = require('./models/hospitals')

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
// Routes
app.use('/hospital', hospital)

app.get('/', (req, res) => {
    res.render('login')
})

app.post('/register', (req, res) => {
    hospitals.findAll({
        where: {
            name: req.body.name
        },
        raw: true
    }).then(hosp => {
        if(hosp.length == 0){
            hospitals.create({
                name: req.body.name,
                password: req.body.password
            })
            res.redirect('/hospital')
        }else{
            res.redirect('/')
        }
    }).catch(error => {
        console.log(`> Error to find names: ${error}`)
    })
})

// Server
app.listen(2020, () => {
    console.log(`> Running server in port 2020`)
})