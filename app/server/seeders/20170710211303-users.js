const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Users', [
      {
        firstName: 'Mary',
        lastName: 'Mazi',
        username: 'mazma',
        phoneNumber: 2348098044534,
        email: 'mazi.mary.o@gmail.com',
        password: bcrypt.hashSync(process.env.SEED_PASSWORD, bcrypt.genSaltSync(7)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Clare',
        lastName: 'Mazi',
        username: 'clare',
        phoneNumber: 2348068668100,
        email: 'holladasheila@gmail.com',
        password: bcrypt.hashSync(process.env.SEED_PASSWORD, bcrypt.genSaltSync(7)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Godwin',
        lastName: 'Ekugbah',
        username: 'chyke',
        phoneNumber: 2348068668101,
        email: 'chyke@yahoo.com',
        password: bcrypt.hashSync(process.env.SEED_PASSWORD, bcrypt.genSaltSync(7)),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),

  down: (queryInterface, Sequelize) =>
   queryInterface.bulkDelete('Users', null, {})
};
