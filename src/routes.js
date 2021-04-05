const express = require('express')
const router = express.Router()
const middleware = require('./helpers/middleware')

const HospitalController = require('./controllers/HospitalController')
const PeopleController = require('./controllers/PeopleController')

const hospitalController = new HospitalController
const peopleController = new PeopleController


router.get('/hospital', middleware.checkADM, hospitalController.hospitalList)
router.delete('/remove-hospital', middleware.checkADM, hospitalController.hospitalRemove)
router.post('/new-hospital', middleware.checkADM, hospitalController.hospitalCreate)
router.post('/login', hospitalController.hospitalLogin)

router.get('/people', peopleController.peopleList)
router.get('/people-state', peopleController.peopleStates)
router.post('/new-person', peopleController.peopleCreate)

module.exports = router