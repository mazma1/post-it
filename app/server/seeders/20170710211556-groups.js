module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Groups', [
      {
        groupName: 'jasmine',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupName: 'bluebell',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupName: 'allamanda',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupName: 'marigold',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupName: 'primrose',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Groups', null, {})
};
