'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feelings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Logbook,{foreignKey:'feelingsId'})  
    }
  }
  Feelings.init({
    name: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    status:{
      type:DataTypes.TINYINT
    }
  }, {
    sequelize,
    modelName: 'Feelings',
  });
  return Feelings;
};