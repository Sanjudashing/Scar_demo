'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface,Sequelize) {
    await queryInterface.createTable('SatisfactionScores',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      logbookId:{
        type:Sequelize.INTEGER
      },
      symptomsId: {
        type: Sequelize.INTEGER
      },
      symptomsLevelId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface,Sequelize) {
    await queryInterface.dropTable('SatisfactionScores');
  }
};