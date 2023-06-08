const Sequelize = require('sequelize');
const {Db} = require('../../../config/database');

const ProductBrandModel = Db.define(
  'product_brands',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      field: 'id',
    },
    name: {
      type: Sequelize.STRING,
      max: 100,
      allowNull: false,
      field: 'name',
    },
    ownerId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      field: 'ownerId',
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'description',
    },
    user_create: {
      type: Sequelize.STRING,
      max: 50,
      defaultValue: null,
      field: 'userCreate',
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'createdAt',
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'updatedAt',
    },
    deleted_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'deletedAt',
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

module.exports = ProductBrandModel;
