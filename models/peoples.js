const Sequelize = require('sequelize')
const db = require('../config/connection')

const peoples = db.define('peoples', {
    name: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER
    },
    sex: {
        type: Sequelize.STRING(20)
    },
    nif: {
        type: Sequelize.INTEGER
    },
    state: {
        type: Sequelize.STRING(20)
    }
})

peoples.sync()

module.exports = peoples