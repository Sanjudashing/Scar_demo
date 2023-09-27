'use strict';
const {
  Model
} = require('sequelize');

const INACTIVE = 0
const ACTIVE = 1

module.exports = (sequelize,DataTypes) => {
  class NotificationPreferences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.ManageNotifications,{foreignKey:'notificationPrefId'})
    }
  }
  NotificationPreferences.init({
    description: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.TINYINT
    }
  },{
    sequelize,
    modelName: 'NotificationPreferences',
  });
  return NotificationPreferences;
};

module.exports.NOTIFICATION_STATUS = { INACTIVE,ACTIVE }