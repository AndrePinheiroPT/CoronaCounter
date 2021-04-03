const { checkParams } = require('../helpers/checkers')
const bcrypt = require('bcryptjs')
const hospitals = require('../../models/hospitals')


class HospitalController{
    async hospitalList(req, res){
        const hospitalsPack = await hospitals.findAll({raw: true})

        res.status(400).json(hospitalsPack)
    }

    async hospitalRemove(req, res){
        try{
            hospitals.destroy({where: {id: req.params.id}})

            console.log('> Hospital successfully removed!')
        }catch(error){
            console.log(`> Error to delete hospital: ${error}`)
        }
    }

    async hospitalCreate(req, res){
        const { name, password } = req.body
        const errors = checkParams(name, password)

        if(errors.length == 0){
            try{
                const hospitalsPack = await hospitals.findAll({where: {name: name}, raw: true})

                if(hospitalsPack.length == 0){
                    try{
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(password, salt, function(err, hash) {
                                hospitals.create({
                                    name: name,
                                    password: hash
                                })
                            })
                        })
                        
                        console.log('> The hospital was registed!')
                    }catch(error){
                        console.log(error) 
                    }
                }else{
                    console.log('> This hospital already exists!')
                }
            }catch(error){
                console.log(`> Error to find names: ${error}`)
            }
            
        }else{
            console.log('> Its impossible create the hospital. ERRORS: ')
            for(const id in errors){
                console.log(errors[id].text)
            }
        }
    }
}

module.exports = HospitalController