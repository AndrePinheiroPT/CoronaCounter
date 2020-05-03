const express = require('express')
const router = express.Router()
const checkers = require('../helpers/authenticate')
const peoples = require('../models/peoples')

function hospOrAdm(user){
    if(user.adm == 1){
        res.redirect('/adm')
        return false
    }else{
        return true
    }
}

router.get('/', checkers.checkHospital, (req, res) => {
    const hosp = req.user[0]

    if(hospOrAdm(hosp)){
        res.render('hospital/home', {hospital: hosp})
    }
})

router.get('/positive', checkers.checkHospital, (req, res) => { 
    const hosp = req.user[0]

    if(hospOrAdm(hosp)){
        res.render('hospital/positive', {hospital: hosp})
    }
})

router.post('/positive', checkers.checkHospital, (req, res) => {
    peoples.create({
        name: req.body.name,
        age: req.body.age,
        sex: req.body.sex,
        nif: req.body.nif,
        state: 'POSITIVE'
    }).then(() => {
        res.redirect('/hospital')
        console.log(`> New positive case resgisted!`)
    }).catch(error => {
        console.log(`> Error to registe: ${error}!`)
    })
})

router.get('/negative', checkers.checkHospital, (req, res) =>{ 
    const hosp = req.user[0]

    if(hospOrAdm(hosp)){
        res.render('hospital/negative', {hospital: hosp})
    }
})

module.exports = router