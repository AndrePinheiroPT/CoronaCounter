const { checkParams } = require('../helpers/checkers')
const bcrypt = require('bcryptjs')
const hospitals = require('../../models/hospitals')

const jwt = require('jsonwebtoken')
const tokenSecret = "my-token-secret"

class HospitalController{
    async hospitalList(req, res){
        try{
            const hospitalsPack = await hospitals.findAll({raw: true})
            return res.status(400).json(hospitalsPack)
        }catch(err){
            console.log(err)
            return res.status(400).send(err)
        }
    }

    async hospitalRemove(req, res){
        try{
            hospitals.destroy({where: {id: req.params.id}})

            return res.status(200).json({text: 'Hospital successfully removed!'})
        }catch(err){
            return res.status(500).json(err)
        }
    }

    async hospitalCreate(req, res){
        try{
            const { name, password } = req.body
            const errors = checkParams(name, password)

            if (errors.length == 0) return res.status(404).json(errors)

            const hospitalsPack = await hospitals.findAll({where: {name: name}, raw: true})

            if (hospitalsPack.length != 0) return res.status(200).json({error: 'This hospital already exists!'})
                
            bcrypt.genSalt(10, (err1, salt) => {
                if (err1) res.status(500).json(err1)
                bcrypt.hash(password, salt, async (err2, hash) => {
                    if (err2) res.status(500).json(err2)
                    const hosp = await hospitals.create({
                        name: name,
                        password: hash
                    })

                    return res.status(201).json({token: generateToken(hosp)})
                })
            })
            
        }catch(err){
            return res.status(500).json(err)
        }
    }

    async hospitalLogin(req, res){
        try{
            const { name, password } = req.body
            const errors = checkParams(name, password)

            if (errors.length == 0) return res.status(404).json(errors)

            const hosp = await hospitals.findOne({ where: { name: name }, raw: true })
            if (hosp.length == 0) return res.status(200).json({error: 'This hospital doesnt exists!'})

            bcrypt.compare(password, hosp.password, (err, match) => {
                if (err) return res.status(500).json(err)
                else if (match) res.status(200).json({token: generateToken(hosp)})
                else res.status(403).json({error: 'passwords do not match'})
            })

        }catch(err){
            return res.status(500).send(err)
        }
    }
}

function generateToken(user){
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'})
}

module.exports = HospitalController