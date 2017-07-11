'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Person', [
      {
        group_name: 'Jasmine',
        user_id: '67',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        group_name: 'Bluebell',
        user_id: '66',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        group_name: 'Allamanda',
        user_id: '67',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        group_name: 'Marigold',
        user_id: '69',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        group_name: 'Primrose',
        user_id: '70',
        createdAt: Date.now(),
        updatedAt: Date.now()
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
