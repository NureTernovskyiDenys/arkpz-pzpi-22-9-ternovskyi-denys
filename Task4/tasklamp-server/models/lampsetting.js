'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const LampSetting = sequelize.define('LampSetting', {
    settingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'SettingID',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'UserID',
    },
    brightness: {
      type: DataTypes.INTEGER,
      defaultValue: 150,
      field: 'Brightness',
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: 'Blue',
      field: 'Color',
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('SYSDATETIMEOFFSET()'),
      field: 'UpdatedAt',
    },
  }, {
    timestamps: false,
    tableName: 'LampSettings',
  });

  LampSetting.associate = function(models) {
    LampSetting.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return LampSetting;
};
