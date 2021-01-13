const Sequelize = require('sequelize')
const sequelize = new Sequelize('mySplits', 'postgres', process.env.POSTGRES_PASSWORD,{
    host: 'localhost',
    dialect: 'postgres',
    pool: {
	max: 9,
	min: 0,
	idle: 10000,
    }
})
const Run = require('./run')(sequelize)

module.exports = {
    sequelize : sequelize,
    Run : Run
}
