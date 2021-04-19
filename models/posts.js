const Sequelize = require('sequelize')
const db = require('../config/connection')

const posts = db.define('peoples', {
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.INTEGER
    },
    author: {
        type: Sequelize.STRING
    }
})

posts.sync()

module.exports = posts 