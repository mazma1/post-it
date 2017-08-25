module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Messages', [
      {
        body: 'Hello house, how is everyone doing?',
        group_id: 1,
        user_id: 1,
        priority: 'normal',
        read_by: 'mazma',
        isArchived: [''],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: 'Great to be here people, holla!',
        group_id: 2,
        user_id: 3,
        priority: 'urgent',
        read_by: 'chyke',
        isArchived: [''],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: 'We are doing great. How is your project going?',
        group_id: 1,
        user_id: 3,
        priority: 'urgent',
        read_by: 'chyke',
        isArchived: [''],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: 'Anyone going for the excursion next week?',
        group_id: 1,
        user_id: 2,
        priority: 'critical',
        read_by: 'clare',
        isArchived: [''],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,',
        group_id: 2,
        user_id: 1,
        priority: 'urgent',
        read_by: 'mazma',
        isArchived: [''],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: 'I have a meetup on the same day!',
        group_id: 1,
        user_id: 3,
        priority: 'normal',
        read_by: 'chyke',
        isArchived: [''],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: '*Strolling by...',
        group_id: 2,
        user_id: 1,
        priority: 'normal',
        read_by: 'mazma',
        isArchived: [''],
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {}),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Messages', null, {})

};
