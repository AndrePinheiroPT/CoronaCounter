const express = require('express')
const router = express.Router()
const checkers = require('../helpers/authenticate')

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

router.get('/positive', checkers.checkHospital, (req, res) =>{ 
    const hosp = req.user[0]

    if(hospOrAdm(hosp)){
        res.render('hospital/positive', {hospital: hosp})
    }
})

router.get('/negative', checkers.checkHospital, (req, res) =>{ 
    const hosp = req.user[0]

    if(hospOrAdm(hosp)){
        res.render('hospital/negative', {hospital: hosp})
    }
})

module.exports = router