'use strict';
const {
  Model
} = require('sequelize');

const STATUS_ACTIVE = 1;
const STATUS_INACTIVE = 0;
module.exports = (sequelize,DataTypes) => {
  class Scar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.ScarJourney,{ foreignKey: 'scarId' })
      this.hasMany(models.Logbook,{ foreignKey: 'scarId' })
      this.hasMany(models.Achievements,{foreignKey:'scarId'})
    }
  }
  Scar.init({
    name: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.TINYINT
    },
  },{
    sequelize,
    modelName: 'Scar',
  });
  return Scar;
};

module.exports.SCAR_STATUS = { STATUS_ACTIVE,STATUS_INACTIVE }