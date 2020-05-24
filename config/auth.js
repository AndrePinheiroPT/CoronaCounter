const LocalStrategy = require('passport-local').Strategy
const hospitals = require('../models/hospitals')
const adms = require('../models/adms')
const bcrypt = require('bcryptjs')

function initialize(passport){
    const authenticateUser = (name, password, done) => {
        hospitals.findAll({
            where: {
                name: name
            },
            raw: true
        }).then(hosp => {
            if(hosp.length == 0){
                adms.findAll({
                    where: {
                        name: name
                    },
                    raw: true
                }).then(adm => {
                    if(adm.length == 0){
                        console.log(`> Invalid hospital`)
                        return done(null, false, {message: 'This hospital doesnt exist!'})
                    }else{
                        bcrypt.compare(password, adm[0].password, (error, result) => {
                            if(result){
                                console.log('MASTER LOGGED!')
                                return done(null, adm)
                            }else{
                                return done(null, false, {message: 'The password has incorrect!'})
                            }
                        })
                    }
                })
            }else{
                bcrypt.compare(password, hosp[0].password, (error, result) => {
                    if(result){
                        return done(null, hosp)
                    }else{
                        return done(null, false, {message: 'The password has incorrect!'})
                    }
                })
            }
        })
    }

    passport.use(new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password'
    }, authenticateUser))

    passport.serializeUser((user, done) => {
        console.log(user)
        done(null, user[0].name)
    })

    passport.deserializeUser((name, done) => {
        hospitals.findAll({
            where: {
                name: name
            },
            raw: true
        }).then(hosp => {
            if(hosp.length == 0){
                adms.findAll({
                    where: {
                        name: name
                    },
                    raw: true
                }).then(adm => {
                    done(null, adm)
                })
            }else{
                done(null, hosp)
            }
        })
    })
}

module.exports = initialize