const adms = require('../../models/adms')
const { checkParams } = require('../helpers/checkers')
const bcrypt = require('bcryptjs')
const hospitals = require('../../models/hospitals')

class AdmController{
    async index(req, res){
        const admList = await adms.findAll({raw: true})

        res.json(admList)
    }
}

module.exports = AdmController