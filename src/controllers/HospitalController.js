const { checkParams } = require('../helpers/checkers')
const bcrypt = require('bcryptjs')
const hospitals = require('../../models/hospitals')


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

            return res.status(200).send('Hospital successfully removed!')
        }catch(err){
            return res.status(500).send(err)
        }
    }

    async hospitalCreate(req, res){
        try{
            const { name, password } = req.body
            const errors = checkParams(name, password)

            if(errors.length == 0){
                const hospitalsPack = await hospitals.findAll({where: {name: name}, raw: true})

                if(hospitalsPack.length == 0){
                    
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(password, salt, function(err, hash) {
                            hospitals.create({
                                name: name,
                                password: hash
                            })
                        })
                    })
                    
                    return res.status(201).send('The hospital was registed!')
                }else{
                    return res.status(200).send('This hospital already exists!')
                }
                
            }else{
                return res.status(200).json(errors)
            }
        }catch(err){
            return res.status(500).send(err)
        }
    }

    async hospitalLogin(req, res){
        try{

        }catch(err){
            return res.status(500).send(err)
        }
    }
}

module.exports = HospitalController