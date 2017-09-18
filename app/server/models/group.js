export default (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupName: {
      allowNull: false,
      type: DataTypes.STRING,
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
  Group.associate = (models) => {
    Group.hasMany(models.Message, { foreignKey: 'groupId' });
    Group.belongsToMany(models.User, {
      as: 'members',
      through: models.GroupMember,
      foreignKey: 'groupId'
    });
  };
  return Group;
};
