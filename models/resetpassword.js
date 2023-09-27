'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize,DataTypes) => {
  class ResetPassword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{foreignKey:'userId'})
    }
  }
  ResetPassword.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    token: {
      type: DataTypes.STRING,
    },
    expiresAt:{
      type:DataTypes.DATE
    }
  },{
    sequelize,
    modelName: 'ResetPassword',
  });
  return ResetPassword;
};