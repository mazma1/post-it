module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Messages', [
      {
        body: 'Hello house, how is everyone doing?',
        group_id: 1,
        user_id: 1,
        priority: 'normal',
        read_by: 'mazma',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: 'Great to be here people, holla!',
        group_id: 2,
        user_id: 3,
        priority: 'urgent',
        read_by: 'chyke',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: 'We are popping. How is you?',
        group_id: 1,
        user_id: 3,
        read_by: 'chyke',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: 'Anyone going for the excursion next week?',
        group_id: 1,
        user_id: 2,
        read_by: 'clare',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: 'Welcome dear, how is you? *In Jenefa\'s voice*',
        group_id: 2,
        user_id: 1,
        read_by: 'mazma',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: 'I have a meetup on the same day!',
        group_id: 1,
        user_id: 3,
        read_by: 'chyke',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: '*Strolling by...',
        group_id: 2,
        user_id: 1,
        read_by: 'mazma',
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {}),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Messages', null, {})

};
