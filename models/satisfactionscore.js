'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize,DataTypes) => {
  class SatisfactionScore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Logbook,{foreignKey:'logbookId'})
      this.belongsTo(models.Symptoms,{ foreignKey: 'symptomsId' })
      this.belongsTo(models.SymptomsLevel,{ foreignKey: 'symptomsLevelId' })
    }
  }
  SatisfactionScore.init({
    logbookId:{
      type:DataTypes.INTEGER,
      references:{
        model:'Logbook',
        key:'id'
      }
    },
    symptomsId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Symptoms',
        key: 'id'
      }
    },
    symptomsLevelId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'SymptomsLevels',
        key: 'id'
      }
    }
  },{
    sequelize,
    modelName: 'SatisfactionScore',
  });
  return SatisfactionScore;
};