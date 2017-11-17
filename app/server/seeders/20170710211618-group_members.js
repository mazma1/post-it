module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('GroupMembers', [
      {
        groupId: 1,
        userId: 1,
        isAdmin: '0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 2,
        userId: 3,
        isAdmin: '0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 1,
        userId: 3,
        isAdmin: '0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 1,
        userId: 2,
        isAdmin: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 2,
        userId: 1,
        isAdmin: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('GroupMembers', null, {})
};
