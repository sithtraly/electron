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

const ProductModel = sequelize.define('tb_product', {
  name: DataTypes.STRING
}, {
  timestamps: true,
  freezeTableName: true,
  modelName: 'tb_product'
})

const OrderModel = sequelize.define('tb_order', {
  qty: DataTypes.NUMBER,
  price: DataTypes.NUMBER
}, {
  timestamps: true,
  freezeTableName: true,
  modelName: 'tb_order'
})

CustomerModel.hasMany(OrderModel, { foreignKey: 'customerId' })
OrderModel.belongsTo(CustomerModel, { foreignKey: 'customerId' })

ProductModel.hasMany(OrderModel, { foreignKey: 'productId' })
OrderModel.belongsTo(ProductModel, { foreignKey: 'productId' })

async function connectdb() {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })
    console.log("Conntected to database successfully")
  } catch (err) {
    console.error("Cannot conntect to database", err)
  }
}

module.exports = { sequelize, connectdb, CustomerModel, ProductModel, OrderModel }