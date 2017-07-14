
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    group_name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, { underscored: true }, {
    classMethods: {
      associate: (models) => {
        Group.hasMany(models.Messages, { foreignKey: 'group_id' });
        Group.belongsToMany(models.Users, { as: 'member', through: models.Group_member, foreignKey: 'group_id' });
      }
    }
  });
  return Group;
};
