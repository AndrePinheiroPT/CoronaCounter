const Sequelize = require('sequelize')
const db = require('../config/connection')

const hospitals = db.define('hosp_accounts', {
    name: {
        type: Sequelize.STRING(150)
    },
    password: {
        type: Sequelize.STRING(40)
    }
})

hospitals.sync()

module.exports = hospitals