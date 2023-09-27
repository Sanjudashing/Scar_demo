'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface,Sequelize) {

    return queryInterface.bulkInsert('Symptoms',[
      {
        name:'Pain',
        status:1
      },
      {
        name:'Itchiness',
        status:1
      },
      {
        name:'Readness',
        status:1
      },
      {
        name:'Swelling',
        status:1
      },

    ])
  },

  async down(queryInterface,Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
