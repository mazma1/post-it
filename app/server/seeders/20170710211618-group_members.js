module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Group_members', [
      {
        group_id: 1,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        group_id: 2,
        user_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        group_id: 1,
        user_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        group_id: 1,
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        group_id: 2,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {}),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Group_members', null, {})
};
