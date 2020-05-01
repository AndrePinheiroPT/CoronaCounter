const express = require("express")
const router = express.Router()
const checkers = require('../helpers/authenticate')

router.get('/', checkers.checkAdm, (req, res) => {
    res.render('adm/home')
})

router.get('/deleteHosp', (req, res) => {
    res.send('Delete Hospital')
})

module.exports = router