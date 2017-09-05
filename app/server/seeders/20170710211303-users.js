const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Users', [
      {
        firstname: 'Mary',
        lastname: 'Mazi',
        username: 'mazma',
        mobile: 2348098044534,
        email: 'mazi.mary.o@gmail.com',
        password: bcrypt.hashSync(process.env.SEED_PASSWORD, bcrypt.genSaltSync(7)),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        firstname: 'Clare',
        lastname: 'Mazi',
        username: 'clare',
        mobile: 2348068668100,
        email: 'holladasheila@gmail.com',
        password: bcrypt.hashSync(process.env.SEED_PASSWORD, bcrypt.genSaltSync(7)),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        firstname: 'Godwin',
        lastname: 'Ekugbah',
        username: 'chyke',
        mobile: 2348068668101,
        email: 'chyke@yahoo.com',
        password: bcrypt.hashSync(process.env.SEED_PASSWORD, bcrypt.genSaltSync(7)),
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {}),

  down: (queryInterface, Sequelize) =>
   queryInterface.bulkDelete('Users', null, {})
};
