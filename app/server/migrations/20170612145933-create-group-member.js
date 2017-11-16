
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('GroupMembers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        references: {
          model: 'Groups',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      isAdmin: {
        type: Sequelize.ENUM('0', '1'),
        defaultValue: '0',
        validate: {
          isIn: [['0', '1']]
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface =>
    queryInterface.dropTable('GroupMembers'),
};
