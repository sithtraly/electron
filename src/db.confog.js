const { Sequelize } = require("sequelize")
const path = require('path')

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(path.join(__dirname, 'database.sqlite'))
})

async function connectdb() {
  try {
    await sequelize.authenticate()
    console.log("Conntected to database successfully")
    sequelize.sync({ alter: true })
  } catch (err) {
    console.error("Cannot conntect to database", err)
  }
}

module.exports = { sequelize, connectdb }