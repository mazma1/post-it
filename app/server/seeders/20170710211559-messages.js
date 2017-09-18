module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Messages', [
      {
        body: 'Hello house, how is everyone doing?',
        groupId: 1,
        userId: 1,
        priority: 'normal',
        readBy: 'mazma',
        isArchived: [''],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'Great to be here people, holla!',
        groupId: 2,
        userId: 3,
        priority: 'urgent',
        readBy: 'chyke',
        isArchived: [''],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'We are doing great. How is your project going?',
        groupId: 1,
        userId: 3,
        priority: 'urgent',
        readBy: 'chyke',
        isArchived: [''],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'Anyone going for the excursion next week?',
        groupId: 1,
        userId: 2,
        priority: 'critical',
        readBy: 'clare',
        isArchived: [''],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,',
        groupId: 2,
        userId: 1,
        priority: 'urgent',
        readBy: 'mazma',
        isArchived: [''],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'I have a meetup on the same day!',
        groupId: 1,
        userId: 3,
        priority: 'normal',
        readBy: 'chyke',
        isArchived: [''],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: '*Strolling by...',
        groupId: 2,
        userId: 1,
        priority: 'normal',
        readBy: 'mazma',
        isArchived: [''],
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Messages', null, {})

};
