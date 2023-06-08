const Sequelize = require('sequelize');
const {Db} = require('../../../config/database');

const DataMejaModel = Db.define(
  'data_meja',
  {
    id_meja: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      field: 'id_meja',
    },
    nama_meja: {
      type: Sequelize.STRING,
      max: 50,
      allowNull: false,
      field: 'nama_meja',
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
  },

  {
    freezeTableName: true,
  },
);

module.exports = DataMejaModel;
