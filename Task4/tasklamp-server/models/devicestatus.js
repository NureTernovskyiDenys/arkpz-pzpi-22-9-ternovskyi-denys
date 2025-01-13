'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const DeviceStatus = sequelize.define('DeviceStatus', {
    deviceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'DeviceID',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'UserID',
    },
    lastSync: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('SYSDATETIMEOFFSET()'),
      field: 'LastSync',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'IsActive',
    },
  }, {
    timestamps: false,
    tableName: 'DeviceStatus',
  });

  DeviceStatus.associate = function(models) {
    DeviceStatus.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return DeviceStatus;
};
