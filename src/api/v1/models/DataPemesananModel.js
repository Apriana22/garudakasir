const Sequelize = require("sequelize");
const {Db} = require('../../../config/database');
const ProductModel = require('./ProductModel');
const DataCustomerModel = require("./DataCustomerModel");

const DataPemesananModel = Db.define(
  'sales_order_details',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      field: 'id',
    },
    salesOrderId: {
      type: Sequelize.STRING(50),
      allowNull: true,
      field: 'salesOrderId',
    },
    productId: {
      type: Sequelize.STRING(50),
      allowNull: true,
      field: 'productId',
    },
    conversionId: {
      type: Sequelize.STRING(50),
      allowNull: true,
      field: 'conversionId',
    },
    quantityOrder: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      field: 'quantityOrder',
    },
    quantityAccepted: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      field: 'quantityAccepted',
    },
    price: {
      type: Sequelize.DECIMAL(15, 4),
      allowNull: true,
      field: 'price',
    },
    percentDiscount: {
      type: Sequelize.DECIMAL(6, 2),
      allowNull: true,
      field: 'percentDiscount',
    },
    nominalDiscount: {
      type: Sequelize.DECIMAL(15, 4),
      allowNull: true,
      field: 'nominalDiscount',
    },
    subTotal: {
      type: Sequelize.DECIMAL(15, 4),
      allowNull: true,
      field: 'subTotal',
    },
    percentTax: {
      type: Sequelize.DECIMAL(6, 2),
      allowNull: true,
      field: 'percentTax',
    },
    nominalTax: {
      type: Sequelize.DECIMAL(15, 4),
      allowNull: true,
      field: 'nominalTax',
    },
    expiredDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
      field: 'expiredDate',
    },
    total: {
      type: Sequelize.DECIMAL(15, 4),
      allowNull: true,
      field: 'total',
    },
    userCreate: {
      type: Sequelize.STRING(50),
      allowNull: true,
      field: 'userCreate',
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true,
      field: 'createdAt',
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      field: 'updatedAt',
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      field: 'deletedAt',
    },
  },
  {
    freezeTableName: true,
  },
);

DataPemesananModel.hasMany(ProductModel, {
  foreignKey: 'id',
  sourceKey: 'productId',
});

// DataPemesananModel.belongsTo(DataCustomerModel, {
//   foreignKey: 'id',
// });

module.exports = DataPemesananModel;
