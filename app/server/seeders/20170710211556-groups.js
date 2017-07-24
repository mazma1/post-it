'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Groups', [
      {
        group_name: 'Jasmine',
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        group_name: 'Bluebell',
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        group_name: 'Allamanda',
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        group_name: 'Marigold',
        user_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        group_name: 'Primrose',
        user_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Groups', null, {});
  }
};
