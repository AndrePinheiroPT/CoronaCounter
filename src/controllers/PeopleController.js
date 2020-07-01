const peoples = require('../../models/peoples')

class PeopleController{
    async index(req, res){
        const peoplesList = await peoples.findAll({ raw: true })

        res.json(peoplesList)
    }
}

module.exports = PeopleController