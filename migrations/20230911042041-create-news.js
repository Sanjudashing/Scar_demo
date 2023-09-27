'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface,Sequelize) {
    await queryInterface.createTable('News',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      newsName: {
        type: Sequelize.STRING
      },
      newsDetails: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.TINYINT,
        comment:"InActive=0 , Active=1"
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
    await queryInterface.dropTable('News');
  }
};