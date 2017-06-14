
module.exports = (sequelize, DataTypes) => {
  const Group_member = sequelize.define('Group_member', {
    group_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        // Group_member.hasMany(models.User, {foreignKey: 'user_id'});
      }
    }
  });
  return Group_member;
};
