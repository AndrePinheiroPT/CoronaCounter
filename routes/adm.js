const express = require("express")
const router = express.Router()
const check = require('../helpers/authenticate')
const bcrypt = require('bcryptjs')
const checkers = require('../helpers/checkers')
const hospitals = require('../models/hospitals')

router.get('/', check.checkAdm, (req, res) => {
    res.render('adm/home')
})

router.get('/deleteHosp', check.checkAdm, (req, res) => {
    res.send('Delete Hospital')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
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
                    
                    req.flash('success_msg', 'The hospital was registed!')
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

module.exports = router