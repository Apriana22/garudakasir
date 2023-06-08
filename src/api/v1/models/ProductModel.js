const Sequelize = require('sequelize');
const {Db} = require('../../../config/database');
const ProductBrandModel = require('./ProductBrandModel');
const ProductTypeModel = require('./ProductTypeModel');
const UserModel = require('./UserModel');

const ProductModel = Db.define(
  'products',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      field: 'id',
    },
    ownerId: {
      type: Sequelize.STRING,
      max: 50,
      allowNull: true,
      field: 'ownerId',
    },
    code: {
      type: Sequelize.STRING,
      max: 50,
      allowNull: true,
      field: 'code',
    },
    barcode: {
      type: Sequelize.STRING,
      allowNull: true,
      max: 100,
      field: 'barcode',
    },
    name: {
      type: Sequelize.STRING,
      max: 100,
      allowNull: false,
      field: 'name',
    },
    brandId: {
      type: Sequelize.STRING,
      max: 50,
      allowNull: true,
      field: 'brandId',
    },
    type: {
      type: Sequelize.STRING,
      max: 30,
      allowNull: true,
      field: 'type',
    },
    typeId: {
      type: Sequelize.STRING,
      max: 50,
      allowNull: true,
      field: 'typeId',
    },
    price: {
      type: Sequelize.DECIMAL(15, 4),
      allowNull: true,
      field: 'price',
    },
    minimumStock: {
      type: Sequelize.INTEGER,
      max: 11,
      allowNull: true,
      defaultValue: 0,
      field: 'minimumStock',
    },
    rack: {
      type: Sequelize.STRING,
      max: 30,
      allowNull: true,
      field: 'rack',
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'description',
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'image',
    },
    hppType: {
      type: Sequelize.STRING,
      max: 15,
      allowNull: true,
      field: 'hppType',
    },
    status: {
      type: Sequelize.INTEGER,
      max: 11,
      defaultValue: 1,
      field: 'status',
    },
    user_create: {
      type: Sequelize.STRING,
      max: 50,
      defaultValue: null,
      field: 'userCreate',
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
    serialNumber: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      field: 'serialNumber',
      max: 11,
    },
  },
  {
    freezeTableName: true,
  },
);

ProductModel.belongsTo(ProductBrandModel, {
  foreignKey: 'brandId',
  as: 'id_merek',
});

ProductModel.belongsTo(ProductTypeModel, {
  foreignKey: 'typeId',
  as: 'id_jenis',
});

/*
//punya banyak owner(yang masukkan kekeranjang)
ProductModel.hasMany(UserModel,{
    foreignKey:"ownerId"
});
*/

//ProductModel.belongsToMany(DataCustomerModel, { through: 'DataPemesananModel' });
module.exports = ProductModel;
