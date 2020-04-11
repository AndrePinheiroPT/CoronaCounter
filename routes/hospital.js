const express = require('express')
const router = express.Router()

router.get('/newcase', (req, res) => {
    res.send('Add new case')
})

module.exports = router