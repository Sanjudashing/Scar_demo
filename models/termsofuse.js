'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize,DataTypes) => {
  class TermsOfUse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TermsOfUse.init({
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
  },{
    sequelize,
    modelName: 'TermsOfUse',
  });
  return TermsOfUse;
};