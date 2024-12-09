const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.confog");

const CustomerModel = sequelize.define('tb_customer', {
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  orderCode: DataTypes.STRING,
}, {
  timestamps: true,
  freezeTableName: true,
  modelName: 'tb_customer'
})

module.exports = CustomerModel