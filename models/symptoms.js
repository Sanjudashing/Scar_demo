'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Symptoms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.SatisfactionScore,{foreignKey:'symptomsId'})
    }
  }
  Symptoms.init({
    name: {
      type: DataTypes.STRING
    },
    status:{
      type:DataTypes.TINYINT
    }
  }, {
    sequelize,
    modelName: 'Symptoms',
  });
  return Symptoms;
};