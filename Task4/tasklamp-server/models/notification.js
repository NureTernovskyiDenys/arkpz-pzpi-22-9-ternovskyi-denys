'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    notificationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'NotificationID',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'UserID',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'Title',
    },
    message: {
      type: DataTypes.TEXT,
      field: 'Message',
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'IsRead',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('SYSDATETIMEOFFSET()'),
      field: 'CreatedAt',
    },
  }, {
    timestamps: false,
    tableName: 'Notifications',
  });

  Notification.associate = function(models) {
    Notification.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Notification;
};
