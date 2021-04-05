const express = require('express')
const router = express.Router()
const middleware = require('./middleware')
const { checkHospital, checkAdm } = require('./helpers/authenticate')

const HospitalController = require('./controllers/HospitalController')
const PeopleController = require('./controllers/PeopleController')

const hospitalController = new HospitalController
const peopleController = new PeopleController


router.get('/hospital', hospitalController.hospitalList)
router.delete('/remove-hospital', hospitalController.hospitalRemove)
router.post('/new-hospital', hospitalController.hospitalCreate)
router.post('/login', hospitalController.hospitalLogin)

router.get('/people-state', peopleController.peopleStates)
router.get('/people', middleware.verify, peopleController.peopleList)
router.post('/new-person', middleware.verify, peopleController.peopleCreate)

module.exports = router