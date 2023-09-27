'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize,DataTypes) => {
  class ScarJourney extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Scar,{ foreignKey: 'scarId' })
      this.belongsTo(models.User,{ foreignKey: 'userId' })
    }
  }
  ScarJourney.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    scarId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Scars',
        key: 'id'
      }
    },
    scarImage: {
      type: DataTypes.STRING
    }
  },{
    sequelize,
    modelName: 'ScarJourney',
  });
  return ScarJourney;
};