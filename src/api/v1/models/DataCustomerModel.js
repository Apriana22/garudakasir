const Sequelize = require('sequelize');
const {Db} = require('../../../config/database');
const DataPemesananModel = require('./DataPemesananModel');
const DataMejaModel = require('./DataMejaModel');
const ProductModel = require('./ProductModel');

const DataCustomerModel = Db.define(
  'member',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      field: 'id',
    },
    code: {
      type: Sequelize.STRING(100),
      allowNull: true,
      field: 'code',
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: 'name',
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'address',
    },
    city: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'city',
    },
    province: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'province',
    },
    country: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'country',
    },
    postalCode: {
      type: Sequelize.STRING(10),
      allowNull: true,
      field: 'postalCode',
    },
    receivableLimit: {
      type: Sequelize.DECIMAL(15, 4),
      allowNull: true,
      field: 'receivableLimit',
    },
    tempoPiece: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'tempoPiece',
    },
    typePiece: {
      type: Sequelize.STRING(100),
      allowNull: true,
      field: 'typePiece',
    },
    accountNumber: {
      type: Sequelize.STRING(100),
      allowNull: true,
      field: 'accountNumber',
    },
    accountName: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'accountName',
    },
    bankName: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'bankName',
    },
    memberLevel: {
      type: Sequelize.STRING(50),
      allowNull: true,
      field: 'memberLevel',
    },
    phoneNumber: {
      type: Sequelize.STRING(15),
      allowNull: true,
      field: 'phoneNumber',
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: true,
      field: 'email',
    },
    userCreate: {
      type: Sequelize.STRING(50),
      allowNull: true,
      field: 'userCreate',
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
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
    serialNumber: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'serialNumber',
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    paranoid: true,
  },
);

DataCustomerModel.hasOne(DataMejaModel, {
  foreignKey: 'id_meja',
});
DataCustomerModel.hasMany(DataPemesananModel, {
  foreignKey: 'salesOrderId',
  sourceKey: 'id',
});

module.exports = DataCustomerModel;
