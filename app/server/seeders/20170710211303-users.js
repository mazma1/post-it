'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstname: 'Mary',
        lastname: 'Mazi',
        username: 'mazma',
        mobile: 2348098044534,
        email: 'mazi.mary@yahoo.com',
        password: 1234,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        firstname: 'Clare',
        lastname: 'Mazi',
        username: 'clare',
        mobile: 2348068668101,
        email: 'clare@yahoo.com',
        password: 1234,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        firstname: 'Godwin',
        lastname: 'Ekugbah',
        username: 'chyke',
        mobile: 2348068668101,
        email: 'chyke@yahoo.com',
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
