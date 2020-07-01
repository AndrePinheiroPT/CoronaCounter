const hospitals = require('../../models/hospitals')

class HospitalController{
    async index(req, res){
        const hospitalList = await hospitals.findAll({ raw: true})

        res.json(hospitalList)
    }
}

module.exports = HospitalController