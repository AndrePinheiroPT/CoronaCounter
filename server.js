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

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/login', (req, res) => {
    res.render('login')
})

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
                res.redirect('/register')
            }
        }).catch(error => {
            console.log(`> Error to find names: ${error}`)
        })
    }else{
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