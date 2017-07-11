'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Messages', [
      {
        body: 'Hello house, how is everyone doing?',
        group_id: '31',
        user_id: '66',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        body: 'Great to be here people, holla!',
        group_id: '32',
        user_id: '69',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        body: 'We are popping. How is you?',
        group_id: '31',
        user_id: '68',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        body: 'Anyone going for the excursion next week?',
        group_id: '31',
        user_id: '67',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        body: 'Welcome dear, how is you? *In Jenefa\'s voice*',
        group_id: '32',
        user_id: '70',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        body: 'I have a meetup on the same day!',
        group_id: '31',
        user_id: '69',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        body: '*Strolling by...',
        group_id: '32',
        user_id: '66',
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
