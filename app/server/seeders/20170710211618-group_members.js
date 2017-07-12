'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Group_members', [
      {
        group_id: '1',
        user_id: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: '2',
        user_id: '4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: '1',
        user_id: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: '1',
        user_id: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: '2',
        user_id: '5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: '1',
        user_id: '5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: '2',
        user_id: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
