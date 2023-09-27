'use strict';
const {
  Model
} = require('sequelize');

const STATUS_ACTIVE = 1;
const STATUS_INACTIVE = 0;
module.exports = (sequelize,DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.ResetPassword,{ foreignKey: 'userId' })
      this.hasMany(models.ScarJourney,{ foreignKey: 'userId' })
      this.hasMany(models.Logbook,{ foreignKey: 'userId' })
      this.hasMany(models.Feedback,{ foreignKey: 'userId' })
      this.hasMany(models.Achievements,{ foreignKey: 'userId' })
      this.hasMany(models.ManageNotifications,{ foreignKey: 'userId' })
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    referral_code: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.TINYINT
    },
  },{
    sequelize,
    modelName: 'User',
  });
  return User;
};

module.exports.STATUS = { STATUS_ACTIVE,STATUS_INACTIVE }