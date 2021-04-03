const express = require('express')
const router = express.Router()
const { checkHospital, checkAdm } = require('./helpers/authenticate')

const HospitalController = require('./controllers/HospitalController')
const PeopleController = require('./controllers/PeopleController')

const hospitalController = new HospitalController
const peopleController = new PeopleController

router.get('/hospital', hospitalController.hospitalList)

router.get('/people', peopleController.peopleList)
router.get('/people-state', peopleController.peopleStates)
router.post('/new-person', peopleController.peopleCreate)

module.exports = router