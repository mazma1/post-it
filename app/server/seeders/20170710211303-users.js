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
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstname: 'Clare',
        lastname: 'Mazi',
        username: 'clare',
        email: 'clare@yahoo.com',
        password: 1234,
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstname: 'Godwin',
        lastname: 'Ekugbah',
        username: 'chyke',
        email: 'chyke@yahoo.com',
        password: 1234,
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstname: 'Oyindamola',
        lastname: 'Adesina',
        username: 'oyin',
        email: 'oyin@yahoo.com',
        password: 1234,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
