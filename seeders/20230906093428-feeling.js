'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface,Sequelize) {
    return queryInterface.bulkInsert('Feelings',[
      {
        name: 'VeryUnhappy',
        image: 'veryunhappy.jpg',
        status: 1
      },
      {
        name: 'Excellent',
        image: 'excellent.jpg',
        status: 1
      },
      {
        name: 'Happy',
        image: 'happy.png',
        status: 1
      },
      {
        name: 'Neautral',
        image: 'neautral.jpg',
        status: 1
      },
      {
        name: 'Unhappy',
        image: 'unhappy.jpg',
        status: 1
      }])
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
