const express = require("express")
const router = express.Router()
//const checkers = require('../helpers/authenticate')

router.get('/', (req, res) => {
    res.send("Welcome to the adm route!")
})


module.exports = router