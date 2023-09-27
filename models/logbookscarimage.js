'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LogbookScarImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Logbook,{foreignKey:'logbookId'})
    }
  }
  LogbookScarImage.init({
    logbookId:{
      type:DataTypes.INTEGER,
      references:{
        model:'Logbooks',
        key:'id'
      }
    },
    image:{
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'LogbookScarImage',
  });
  return LogbookScarImage;
};