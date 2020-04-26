const Sequelize = require('sequelize')
const db = require('../config/connection')

const hospitals = db.define('hosp_accounts', {
    name: {
        type: Sequelize.STRING(150)
    },
    password: {
        type: Sequelize.STRING
    },
    adm: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})

hospitals.sync()

module.exports = hospitals