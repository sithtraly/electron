

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
  key: DataTypes.STRING,
  value: DataTypes.STRING,
}, {
  timestamps: true,
  freezeTableName: true,
  modelName: 'tb_setting',
})

const CustomerModel = sequelize.define('tb_customer', {
  name: DataTypes.STRING,
  // phone: DataTypes.STRING,c
  // address: DataTypes.STRING,
  // code: DataTypes.STRING,
  customerCode: DataTypes.NUMBER,
}, {
  timestamps: true,
  freezeTableName: true,
  modelName: 'tb_customer'
})

const ProductModel = sequelize.define('tb_product', {
  name: DataTypes.STRING,
  dividend: DataTypes.NUMBER,
  code: DataTypes.NUMBER,
}, {
  timestamps: true,
  freezeTableName: true,
  modelName: 'tb_product'
})

const OrderModel = sequelize.define('tb_order', {
  qty: DataTypes.NUMBER,
  price: DataTypes.NUMBER,
  carNo: DataTypes.STRING,
  phone: DataTypes.STRING,
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
  invNumber: DataTypes.STRING,
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

    // seeder
    // create invoice number
    const invNum = await SettingModel.findOne({ where: { key: 'invNum' } })
    if (!invNum) await SettingModel.create({ key: 'invNum', value: 1 })

    // create max invoice number
    const maxInvNum = await SettingModel.findOne({ where: { key: 'maxInvNum' } })
    if (!maxInvNum) await SettingModel.create({ key: 'maxInvNum', value: 99999 })
    if (maxInvNum) {
      const maxInvNum = await SettingModel.findOne({ where: { key: 'maxInvNum' } })
      if (maxInvNum != 99999) SettingModel.update({ value: 99999 }, { where: { key: 'maxInvNum' } })
    }

    const savePath = await SettingModel.findOne({ where: { key: 'savePath' } })
    if (!savePath) await SettingModel.create({ key: 'savePath', value: app.getPath('documents') })

    const customers = await CustomerModel.findAll({ where: { customerCode: null }, raw: true })
    if (customers.length > 0) await sequelize.query('update tb_customer set customerCode = id where customerCode is NULL;')
    const products = await CustomerModel.findAll({ where: { code: null, raw: true } })
    if (products.length > 0) await sequelize.query('update tb_product set code = id where code is NULL;')

  } catch (err) {
    console.error("Cannot conntect to database", err)
  }
}

module.exports = { sequelize, connectdb, SettingModel, CustomerModel, ProductModel, OrderModel, dbPath, configPath }