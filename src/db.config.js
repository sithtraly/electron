const { Sequelize, DataTypes } = require("sequelize")
const path = require('path')

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(path.join(__dirname, 'database.sqlite')),
})

const CustomerModel = sequelize.define('tb_customer', {
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  code: DataTypes.STRING,
}, {
  timestamps: true,
  freezeTableName: true,
  modelName: 'tb_customer'
})

async function connectdb() {
  try {
    await sequelize.authenticate()
    await sequelize.sync({alter: true})
    console.log("Conntected to database successfully")
  } catch (err) {
    console.error("Cannot conntect to database", err)
  }
}

module.exports = { sequelize, connectdb, CustomerModel }