const Sequelize = require('sequelize')
const db = require('../config/connection')

const hospitals = db.define('hospitals', {
    name: {
        type: Sequelize.STRING(150)
    },
    password: {
        type: Sequelize.STRING
    },
    admim: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})

hospitals.sync()

module.exports = hospitals