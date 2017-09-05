export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, { underscored: true });
  User.associate = (models) => {
    User.hasMany(models.Group, { foreignKey: 'user_id' });
    User.hasMany(models.Message, { foreignKey: 'user_id' });
    User.belongsToMany(models.Group, { through: models.Group_member, as: 'group', foreignKey: 'user_id' });
    // User.hasMany(models.Group_member, { as: 'group', foreignKey: 'user_id' });
  };
  return User;
};
