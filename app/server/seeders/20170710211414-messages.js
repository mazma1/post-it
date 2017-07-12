'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Messages', [
      {
        body: 'Hello house, how is everyone doing?',
        group_id: '1',
        user_id: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'Great to be here people, holla!',
        group_id: '2',
        user_id: '4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'We are popping. How is you?',
        group_id: '1',
        user_id: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'Anyone going for the excursion next week?',
        group_id: '1',
        user_id: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'Welcome dear, how is you? *In Jenefa\'s voice*',
        group_id: '2',
        user_id: '5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'I have a meetup on the same day!',
        group_id: '1',
        user_id: '5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: '*Strolling by...',
        group_id: '2',
        user_id: '1',
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
