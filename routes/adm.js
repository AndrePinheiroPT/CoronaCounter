const express = require("express")
const router = express.Router()
const isAdm = require('../helpers/isAdm')

router.get('/', isAdm, (req, res) => {
    res.send("Welcome to the adm route!")
})


module.exports = router