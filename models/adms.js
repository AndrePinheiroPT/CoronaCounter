const Sequelize = require('sequelize')
const db = require('../config/connection')

const adms = db.define('adms', {
    name: {
        type: Sequelize.STRING(150)
    },
    password: {
        type: Sequelize.STRING
    }
})

adms.sync()

module.exports = adms