const express = require('express')
const router = express.Router()
const logged = require('../helpers/authenticate')

router.get('/', logged, (req, res) => {
    res.render('hospital/home', {hosp: req.user[0]})
})

module.exports = router