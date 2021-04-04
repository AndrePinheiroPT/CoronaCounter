const peoples = require('../../models/peoples')
const { checkDocs } = require('../helpers/checkers')

class PeopleController{
    async peopleList(req, res){
        const peoplesList = await peoples.findAll({ raw: true })

        return res.status(200).json(peoplesList)
    }

    async peopleStates(req, res){
        try{
            const peoplesList = await peoples.findAll({ raw: true })

            const stateLength = {
                positive: 0,
                negative: 0,
                recovered: 0,
                inconclusive: 0,
            }

            peoplesList.forEach(person => {
                switch(person.state){
                    case 'POSITIVE':
                        stateLength.positive++
                        break
                    case 'NEGATIVE':
                        stateLength.negative++
                        break
                    case 'RECOVERED':
                        stateLength.recovered++
                        break
                    default:
                        stateLength.inconclusive++
                }
            })

            return res.status(200).json(stateLength)
        }catch(err){
            console.log(err)
            return res.status(500).send(err)
        }
    } 

    async peopleCreate(req, res){
        try{
            const { name, age, sex, nif, state } = req.body
            const errors = checkDocs(name, age, sex, nif)

            if(errors.length == 0){
                
                const person = await peoples.findOne({ where: { name: name }, raw: true })

                if(person === null){
                    const newPerson = await peoples.create({ name, age, sex, nif, state })
                    res.status(201).json(newPerson)
                }else{
                    peoples.update({
                        state: state
                    }, { where: { name: name }})
                    res.status(201).json(person)
                }
            }else{
                return res.status(200).json(erros)
            }
        }catch(err){
            console.log(err)
            return res.status(500).send(err)
        }
    }
}

module.exports = PeopleController