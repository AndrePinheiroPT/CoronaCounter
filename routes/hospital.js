const express = require('express')
const router = express.Router()
const logged = require('../helpers/authenticate')

router.get('/', logged, (req, res) => {
    if(req.user[0].adm == 1){
        res.redirect('/adm')
    }else{
        res.render('hospital/home', {hospital: req.user[0]})
    }
})

module.exports = router