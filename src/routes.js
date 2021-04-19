const express = require('express')
const router = express.Router()
const middleware = require('./helpers/middleware')

const HospitalController = require('./controllers/HospitalController')
const PeopleController = require('./controllers/PeopleController')
const PostsController = require('./controllers/PostsController')

const hospitalController = new HospitalController
const peopleController = new PeopleController

router.get('/posts', middleware.checkHOSPITAL, PostsController.postList)
router.post('/new-post', middleware.checkHOSPITAL, PostsController.postCreate)

router.get('/hospital', middleware.checkADM, hospitalController.hospitalList)
router.delete('/remove-hospital', middleware.checkADM, hospitalController.hospitalRemove)
router.post('/new-hospital', middleware.checkADM, hospitalController.hospitalCreate)
router.post('/login', hospitalController.hospitalLogin)

router.get('/people-state', peopleController.peopleStates)
router.get('/people', middleware.verify, peopleController.peopleList)
router.post('/new-person', middleware.verify, peopleController.peopleCreate)

module.exports = router