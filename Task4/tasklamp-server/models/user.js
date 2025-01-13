'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'UserID',
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'PasswordHash',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('SYSDATETIMEOFFSET()'),
      field: 'CreatedAt',
    },
  }, {
    timestamps: false,
    tableName: 'Users',
  });

  User.associate = function(models) {
    User.hasMany(models.DeviceStatus, { foreignKey: 'userId' });
    User.hasMany(models.LampSetting, { foreignKey: 'userId' });
    User.hasMany(models.Notification, { foreignKey: 'userId' });
    User.hasMany(models.Task, { foreignKey: 'userId' });
  };

  return User;
};
