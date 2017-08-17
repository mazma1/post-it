'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Messages', [
      {
        body: 'Hello house, how is everyone doing?',
        group_id: 1,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: 'Great to be here people, holla!',
        group_id: 2,
        user_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: 'We are popping. How is you?',
        group_id: 1,
        user_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: 'Anyone going for the excursion next week?',
        group_id: 1,
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: 'Welcome dear, how is you? *In Jenefa\'s voice*',
        group_id: 2,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: 'I have a meetup on the same day!',
        group_id: 1,
        user_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: '*Strolling by...',
        group_id: 2,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Messages', null, {});
  }
};
