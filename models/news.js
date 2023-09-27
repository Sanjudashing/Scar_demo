'use strict';
const {
  Model
} = require('sequelize');

const INACTIVE=0
const ACTIVE=1

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  News.init({
    newsName: {
      type: DataTypes.STRING
    },
    newsDetails: {
      type: DataTypes.STRING
    },
    status:{
      type:DataTypes.TINYINT
    }
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};


module.exports.NEWS_STATUS={INACTIVE,ACTIVE}