'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize,DataTypes) => {
  class Logbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.LogbookScarImage,{ foreignKey: 'logbookId' })
      this.hasMany(models.SatisfactionScore,{ foreignKey: 'logbookId' })
      this.belongsTo(models.User,{ foreignKey: 'userId' })
      this.belongsTo(models.Feelings,{ foreignKey: 'feelingsId' })
      this.belongsTo(models.Scar,{ foreignKey: 'scarId' })
    }
  }
  Logbook.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    feelingsId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Feelings',
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
    length: {
      type: DataTypes.DECIMAL(5,2)
    },
    depth: {
      type: DataTypes.DECIMAL(5,2)
    },
    massageTimer: {
      type: DataTypes.DATE
    },
  },{
    sequelize,
    modelName: 'Logbook',
  });
  return Logbook;
};