const express = require('express')
const router = express.Router()
const checkers = require('../helpers/authenticate')
const check = require('../helpers/checkers')
const peoples = require('../models/peoples')
const adms = require('../models/adms')


router.get('/', checkers.checkHospital, (req, res) => {
    res.render('hospital/home', {hospital: req.user[0]})
    
})

router.get('/positive', checkers.checkHospital, (req, res) => { 
    res.render('hospital/positive', {hospital: req.user[0]})

})

router.get('/negative', checkers.checkHospital, (req, res) => {
    res.render('hospital/negative', {hospital: req.user[0]})
    
})

router.post('/positive', checkers.checkHospital, (req, res) => {
    const errors = check.checkDocs(req.body.name,
        req.body.age,
        req.body.sex,
        req.body.nif
        )

    if(errors.length == 0){
        peoples.findAll({
            where: {
                name: req.body.name,
                sex: req.body.sex,
                nif: req.body.nif
            },
            raw: true
        }).then(people => {
            if(people.length == 0){
                peoples.create({
                    name: req.body.name,
                    age: req.body.age,
                    sex: req.body.sex,
                    nif: req.body.nif,
                    state: 'POSITIVE'
                }).then(() => {
                    req.flash('success_msg', 'New positive case resgisted!')
                    res.redirect('/hospital')
                }).catch(error => {
                    console.log(`> Error to registe: ${error}!`)
                })
            }else{
                if(people[0].state == 'INCONCLUSIVE'){
                    // STATE POSITIVE
                    peoples.update({
                        state: 'POSITIVE'
                    }, {
                        where: {
                            name: req.body.name,
                            sex: req.body.sex,
                            nif: req.body.nif
                        },
                        raw: true
                    })
                }
            }
        })
        
    }else{
        req.flash('error_msg', errors)
        res.redirect('/hospital/positive')
    }
})

router.get('/negative', checkers.checkHospital, (req, res) =>{ 
    res.render('hospital/negative', {hospital: req.user[0]})
    
})

router.post('/negative', checkers.checkHospital, (req, res) => {
    const errors = check.checkDocs(req.body.name,
        req.body.age,
        req.body.sex,
        req.body.nif
        )
    
    if(errors.length == 0){
        peoples.findAll({
            where: {
                name: req.body.name,
                sex: req.body.sex,
                nif: req.body.nif
            },
            raw: true
        }).then(people => {
            if(people.length == 0){
                peoples.create({
                    name: req.body.name,
                    age: req.body.age,
                    sex: req.body.sex,
                    nif: req.body.nif,
                    state: 'NEGATIVE'
                }).then(() => {
                    req.flash('success_msg', 'New negative case registed!')
                    res.redirect('/hospital')
                }).catch(error => {
                    console.log(`> Error to registe: ${error}!`)
                })
            }else{
                if(people[0].state == 'NEGATIVE'){
                    // STATE RECOVERED
                    peoples.update({
                        state: 'RECOVERY'
                    }, {
                        where: {
                            name: req.body.name,
                            sex: req.body.sex,
                            nif: req.body.nif
                        },
                        raw: true
                    })
                }else if(people[0].state == 'INCONCLUSIVE'){
                    // STATE NEGATIVE
                    peoples.update({
                        state: 'NEGATIVE'
                    }, {
                        where: {
                            name: req.body.name,
                            sex: req.body.sex,
                            nif: req.body.nif
                        },
                        raw: true
                    })
                }
            }
        })
    }else{
        req.flash('error_msg', errors)
        res.redirect('/hospital/negative')
    }
})

router.get('/inconclusive', checkers.checkHospital, (req, res) => {
    res.render('hospital/inconclusive', {hospital: req.user[0]})
})

router.post('/inconclusive', checkers.checkHospital, (req, res) => {
    const errors = check.checkDocs(req.body.name,
        req.body.age,
        req.body.sex,
        req.body.nif
        )
    
    if(errors.length == 0){
        peoples.findAll({
            where: {
                name: req.body.name,
                sex: req.body.sex,
                nif: req.body.nif
            },
            raw: true
        }).then(people => {
            if(people.length == 0){
                peoples.create({
                    name: req.body.name,
                    age: req.body.age,
                    sex: req.body.sex,
                    nif: req.body.nif,
                    state: 'INCONCLUSIVE'
                }).then(() => {
                    req.flash('success_msg', 'New inconclusive case registed!')
                    res.redirect('/hospital')
                }).catch(error => {
                    console.log(`> Error to registe: ${error}!`)
                })
            }
        })
    }else{
        req.flash('error_msg', errors)
        res.redirect('/hospital/inconclusive')
    }
})

module.exports = router