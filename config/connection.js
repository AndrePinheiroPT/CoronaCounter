const Sequelize = require('sequelize')
const sequelize = new Sequelize('corona_date', 'root', 'andre2004', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(() => {
    console.log('> Connect to datebase: corona_counter')
}).catch(error => {
    console.log(`> Error in connect to database: ${error}`)
})

module.exports = sequelize