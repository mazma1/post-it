
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: DataTypes.INTEGER,
    group_name: DataTypes.VARCHAR,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        Group.hasMany(models.Message);
      }
    }
  });
  return Group;
};
