'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ManageNotifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{ foreignKey: 'userId' })
      this.belongsTo(models.NotificationPreferences,{ foreignKey: 'notificationPrefId' })
    }
  }
  ManageNotifications.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    notificationPrefId:{
      type:DataTypes.INTEGER,
      references:{
        model:'ManageNotifications',
        key:'id'
      }, 
    }
  }, {
    sequelize,
    modelName: 'ManageNotifications',
  });
  return ManageNotifications;
};