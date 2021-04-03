const LocalStrategy = require('passport-local').Strategy
const hospitals = require('../models/hospitals')
const adms = require('../models/adms')
const bcrypt = require('bcryptjs')

async function initialize(passport){
    const authenticateUser = async (name, password, done) => {
        const hospital = await hospitals.findOne({where: {name: name}, raw: true})

        if(hospital.length == 0){
            const adm = await adms.findOne({where: {name: name}, raw: true})

            if(adm.length == 0){
                console.log(`> Invalid hospital`)
                return done(null, false, {message: 'This hospital doesnt exist!'})
            }else{
                bcrypt.compare(password, adm.password, (error, result) => {
                    if(result){
                        console.log('> MASTER LOGGED!')
                        return done(null, adm)
                    }else{
                        return done(null, false, {message: 'The password has incorrect!'})
                    }
                })
            }
        }else{
            bcrypt.compare(password, hospital.password, (error, result) => {
                if(result){
                    return done(null, hospital)
                }else{
                    return done(null, false, {message: 'The password has incorrect!'})
                }
            })
        }
    }

    passport.use(new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password'
    }, authenticateUser))

    passport.serializeUser((user, done) => {
        console.log(`> User logged: ${user}`)
        done(null, user.name)
    })

    passport.deserializeUser(async (name, done) => {
        const hospital = await hospitals.findAll({where: {name: name}, raw: true})

        if(hospital.length == 0){
            const adm = await adms.findAll({where: {name: name}, raw: true})
            done(null, adm)
        }else{
            done(null, hospital)
        }
    })
}

module.exports = initialize