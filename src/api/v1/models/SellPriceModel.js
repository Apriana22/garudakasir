const Sequelize = require('sequelize');
const {Db} = require('../../../config/database');
const ProductModel = require('./ProductModel');
const UserModel = require('./UserModel');
const WarehouseModel = require('./WarehouseModel');

const SellPriceModel = Db.define(
  'sell_price',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      field: 'id',
    },
    conversionId: {
      type: Sequelize.STRING,
      max: 50,
      allowNull: true,
      field: 'conversionId',
    },
    storeId: {
      type: Sequelize.STRING,
      max: 50,
      allowNull: false,
      field: 'storeId',
    },
    ownerId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      max: 50,
      field: 'ownerId',
    },
    level: {
      type: Sequelize.STRING,
      max: 50,
      defaultValue: null,
      field: 'level',
    },
    price: {
      type: Sequelize.STRING,
      max: 50,
      defaultValue: null,
      field: 'price',
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'createdAt',
      timestamps: true,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'updatedAt',
      timestamps: true,
    },
    deletedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'deletedAt',
      timestamps: true,
    },
  },
  {
    freezeTableName: true,
  },
);
/*
StockModel.belongsTo(ProductModel,{
    foreignKey:"productId"
})
StockModel.belongsTo(WarehouseModel,{
    foreignKey:"warehouseId"
})
StockModel.belongsTo(UserModel,{
    foreignKey:"userCreate",
});
*/
module.exports = SellPriceModel;
