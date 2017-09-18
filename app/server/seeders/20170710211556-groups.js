module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Groups', [
      {
        groupName: 'Jasmine',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupName: 'Bluebell',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupName: 'Allamanda',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupName: 'Marigold',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupName: 'Primrose',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Groups', null, {})
};
