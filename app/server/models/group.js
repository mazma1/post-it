
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    group_name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        Group.hasMany(models.Message, {foreignKey: 'group_id'});
      }
    }
  });
  return Group;
};
