const Sequelize = require('sequelize');
const {Db} = require('../../../config/database');
const DataPemesananModel = require('./DataPemesananModel');
const UserModel = require('./UserModel');

const DataCheckoutModel = Db.define(
  'sales_order',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      field: 'id',
    },
    invoice: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'invoice',
    },
    serialNumber: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'serialNumber',
    },
    warehouseId: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'warehouseId',
    },
    date: {
      type: Sequelize.DATE,
      allowNull: true,
      field: 'date',
    },
    deliveryDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
      field: 'deliveryDate',
    },
    memberId: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'memberId',
      unique: 'memberIdIndex',
    },
    cashId: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'cashId',
    },
    salesId: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'salesId',
    },
    taxType: {
      type: Sequelize.STRING(15),
      allowNull: true,
      field: 'taxType',
    },
    productTotal: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'productTotal',
    },
    productTotalReceive: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'productTotalRecive',
    },
    quantityOrder: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'quantityOrder',
    },
    quantityAccepted: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'quantityAccepted',
    },
    percentTax: {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: true,
      field: 'percentTax',
    },
    nominalTax: {
      type: Sequelize.DECIMAL(15, 4),
      allowNull: true,
      field: 'nominalTax',
    },
    subTotal: {
      type: Sequelize.DECIMAL(15, 4),
      allowNull: true,
      field: 'subTotal',
    },
    nominalDiscount: {
      type: Sequelize.DECIMAL(15, 4),
      allowNull: true,
      field: 'nominalDiscount',
    },
    percentDiscount: {
      type: Sequelize.DECIMAL(15, 4),
      allowNull: true,
      field: 'percentDiscount',
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'description',
    },
    additionalCosts: {
      type: Sequelize.DECIMAL(15, 4),
      allowNull: true,
      field: 'additionalCosts',
    },
    total: {
      type: Sequelize.DECIMAL(15, 4),
      allowNull: true,
      field: 'total',
    },
    pay: {
      type: Sequelize.DECIMAL(10, 0),
      allowNull: true,
      field: 'pay',
    },
    remainder: {
      type: Sequelize.DECIMAL(15, 4),
      allowNull: true,
      field: 'remainder',
    },
    accountDpSoId: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'accountDpSoId',
    },
    accountCashDpSoId: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'accountCashDpSoId',
    },
    userCreate: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'userCreate',
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
      field: 'createdAt',
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
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

DataCheckoutModel.belongsTo(DataPemesananModel, {
  foreignKey: 'salesId',
});

DataCheckoutModel.belongsTo(UserModel, {
  foreignKey: 'userCreate',
});

module.exports = DataCheckoutModel;
