'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    taskId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'TaskID',
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
    description: {
      type: DataTypes.TEXT,
      field: 'Description',
    },
    dueDate: {
      type: DataTypes.DATE,
      field: 'DueDate',
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'IsCompleted',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('SYSDATETIMEOFFSET()'),
      field: 'CreatedAt',
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('SYSDATETIMEOFFSET()'),
      field: 'UpdatedAt',
    },
  }, {
    timestamps: false,
    tableName: 'Tasks',
  });

  Task.associate = function(models) {
    Task.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Task;
};
