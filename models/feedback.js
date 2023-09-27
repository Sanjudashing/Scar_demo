'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize,DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{ foreignKey: 'userId' })
    }
  }
  Feedback.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    comment: {
      type: DataTypes.STRING
    },
  },{
    sequelize,
    modelName: 'Feedback',
  });
  return Feedback;
};