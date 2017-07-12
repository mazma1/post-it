'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Groups', [
      {
        group_name: 'Jasmine',
        user_id: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_name: 'Bluebell',
        user_id: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_name: 'Allamanda',
        user_id: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_name: 'Marigold',
        user_id: '4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_name: 'Primrose',
        user_id: '5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
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
