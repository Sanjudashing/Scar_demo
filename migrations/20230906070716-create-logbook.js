'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface,Sequelize) {
    await queryInterface.createTable('Logbooks',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      scarId: {
        type: Sequelize.INTEGER
      },
      feelingsId: {
        type: Sequelize.INTEGER
      },
      length: {
        type: Sequelize.DECIMAL(5,2)
      },
      depth: {
        type: Sequelize.DECIMAL(5,2)
      },
      massageTimer: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Logbooks');
  }
};