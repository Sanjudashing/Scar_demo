'use strict';
const {
  Model
} = require('sequelize');

const isSent = 1
module.exports = (sequelize,DataTypes) => {
  class Achievements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{ foreignKey: 'userId' })
      this.belongsTo(models.Scar,{ foreignKey: 'scarId' })
    }
  }
  Achievements.init({
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
    message: {
      type: DataTypes.STRING
    },
    weeks:{
      type:DataTypes.INTEGER
    },
    status: {
      type: DataTypes.TINYINT
    }
  },{
    sequelize,
    modelName: 'Achievements',
  });
  return Achievements;
};

module.exports.STATUS={isSent}
