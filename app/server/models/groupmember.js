export default (sequelize, DataTypes) => {
  const GroupMember = sequelize.define('GroupMember', {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    isAdmin: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '0',
      validate: {
        isIn: [['0', '1']]
      }
    }
  });

  return GroupMember;
};
