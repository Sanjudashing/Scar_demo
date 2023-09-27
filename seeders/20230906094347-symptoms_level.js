'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SymptomsLevels',[
      {
        name:'None',
        status:1
      },
      {
        name:'Mild',
        status:1
      },
      {
        name:'Moderate',
        status:1
      },
      {
        name:'Significant',
        status:1
      },
      {
        name:'Severe',
        status:1
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
