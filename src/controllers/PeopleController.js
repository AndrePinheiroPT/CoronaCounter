const peoples = require('../../models/peoples')
const { checkDocs } = require('../helpers/checkers')

class PeopleController{
    async index(req, res){
        const peoplesList = await peoples.findAll({ raw: true })

        res.json(peoplesList)
    }

    async store(req, res){
        const { name, age, sex, nif, state } = req.body
        const errors = checkDocs(name, age, sex, nif)

        if(errors.length == 0){
            try{
                const newPeople = await peoples.create({ name, age, sex, nif, state })
    
                res.json(newPeople)
            }catch(err){
                console.log(err)
            }
        }
    }
}

module.exports = PeopleController