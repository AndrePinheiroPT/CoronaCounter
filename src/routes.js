const express = require('express')
const router = express.Router()

const HospitalController = require('./controllers/HospitalController')
const PeopleController = require('./controllers/PeopleController')

const hospitalController = new HospitalController
const peopleController = new PeopleController

router.get('/hospital', hospitalController.index)
router.get('/peoples', peopleController.index)
router.post('/new-people', peopleController.store)

module.exports = router