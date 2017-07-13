'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstname: 'Mary',
        lastname: 'Mazi',
        username: 'mazma',
        email: 'mazi.mary@yahoo.com',
        password: 1234,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        firstname: 'Clare',
        lastname: 'Mazi',
        username: 'clare',
        email: 'clare@yahoo.com',
        password: 1234,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        firstname: 'Godwin',
        lastname: 'Ekugbah',
        username: 'chyke',
        email: 'chyke@yahoo.com',
        password: 1234,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        firstname: 'Oyindamola',
        lastname: 'Adesina',
        username: 'oyin',
        email: 'oyin@yahoo.com',
        password: 1234,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        firstname: 'Bolaji',
        lastname: 'Bello',
        username: 'beejay',
        email: 'bolaji@yahoo.com',
        password: 1234,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        firstname: 'Rose',
        lastname: 'Mazi',
        username: 'rose',
        email: 'rose@yahoo.com',
        password: 1234,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
