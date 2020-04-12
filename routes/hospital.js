const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('login')
})

router.get('/newcase', (req, res) => {
    res.send('Add new case')
})

module.exports = router