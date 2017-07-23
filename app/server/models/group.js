
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    group_name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, { underscored: true });
  Group.associate = (models) => {
    Group.hasMany(models.Message, { foreignKey: 'group_id' });
    Group.belongsToMany(models.User, { as: 'members', through: models.Group_member, foreignKey: 'group_id' });
  };
  return Group;
};
