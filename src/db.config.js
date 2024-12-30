const { Sequelize, DataTypes } = require("sequelize")
const path = require('path')
const { app } = require("electron")
const { existsSync, writeFileSync, readFileSync, mkdirSync } = require("fs")


const appdata = app.getPath('appData')
const configPath = path.join(appdata, app.getName(), 'config.txt')
const defaultDbPath = path.join(appdata, app.getName(), 'database.sqlite')
let dbPath
if (!existsSync(configPath)) {
  const dp = path.join(appdata, app.getName())
  if (!existsSync(dp)) mkdirSync(dp)
  writeFileSync(configPath, defaultDbPath)
} else {
  const db = readFileSync(configPath)
  dbPath = db.toString()
}

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath || defaultDbPath,
})
// sequelize.getQueryInterface().sequelize.query('PRAGMA journal_mode=WAL;')

const SettingModel = sequelize.define('tb_setting', {
  name: DataTypes.STRING,
  value: DataTypes.STRING,
}, {
  timestamps: true,
  freezeTableName: true,
  modelName: 'tb_setting',
})

const CustomerModel = sequelize.define('tb_customer', {
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  // address: DataTypes.STRING,
  // code: DataTypes.STRING,
}, {
  timestamps: true,
  freezeTableName: true,
  modelName: 'tb_customer'
})

const ProductModel = sequelize.define('tb_product', {
  name: DataTypes.STRING
}, {
  timestamps: true,
  freezeTableName: true,
  modelName: 'tb_product'
})

const OrderModel = sequelize.define('tb_order', {
  qty: DataTypes.NUMBER,
  price: DataTypes.NUMBER,
  carNo: DataTypes.STRING,
  // stockNo: DataTypes.STRING,
  // isPaid: {
  //   type: DataTypes.BOOLEAN,
  //   defaultValue: true,
  // },
  isPrinted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  customerId: DataTypes.NUMBER,
  productId: DataTypes.NUMBER,
  // transportNo: DataTypes.STRING,
  // currency: {
  //   type: DataTypes.STRING,
  //   defaultValue: 'USD'
  // },
  code: DataTypes.STRING,
  address: DataTypes.STRING,
}, {
  timestamps: true,
  freezeTableName: true,
  modelName: 'tb_order'
})

// CustomerModel.hasMany(OrderModel, { foreignKey: 'customerId' })
// OrderModel.belongsTo(CustomerModel, { foreignKey: 'customerId' })

// ProductModel.hasMany(OrderModel, { foreignKey: 'productId' })
// OrderModel.belongsTo(ProductModel, { foreignKey: 'productId' })

async function connectdb() {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })
    console.log("Conntected to database successfully")
  } catch (err) {
    console.error("Cannot conntect to database", err)
  }
}

module.exports = { sequelize, connectdb, SettingModel, CustomerModel, ProductModel, OrderModel, dbPath, configPath }