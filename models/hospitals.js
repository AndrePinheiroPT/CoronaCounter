const Sequelize = require('sequelize')
const sequelize = require('../config/connection')

const hospitals = sequelize.define('hosp_accounts', {
    name: {
        type: Sequelize.STRING(150)
    },
    password: {
        type: Sequelize.STRING(40)
    }
})

module.exports = hospitals