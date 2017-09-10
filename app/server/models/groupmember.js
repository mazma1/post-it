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
    }
  });
  GroupMember.associate = (models) => {

  };

  return GroupMember;
};
