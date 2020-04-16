const LocalStrategy = require('passport-local').Strategy
const hospitals = require('../models/hospitals')
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
                console.log(`> Invalid hospital`)
                return done(null, false, {message: 'This hospital doesnt exist!'})
            }

            bcrypt.compare(password, hosp[0].password, (error, result) => {
                if(result){
                    return done(null, hosp)
                }else{
                    return done(null, false, {message: 'The password has incorrect!'})
                }
            })
        })
    }

    passport.use(new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password'
    }, authenticateUser))

    passport.serializeUser((hosp, done) => {
        done(null, hosp[0].id)
    })

    passport.deserializeUser((id, done) => {
        hospitals.findAll({
            where: {
                id: id
            },
            raw: true
        }).then(hosp => {
            done(null, hosp)
        })
    })
}

module.exports = initialize