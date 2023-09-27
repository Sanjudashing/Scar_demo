'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize,DataTypes) => {
  class PrivacyPolicy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PrivacyPolicy.init({
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING
    },
  },{
    sequelize,
    modelName: 'PrivacyPolicy',
  });
  return PrivacyPolicy;
};