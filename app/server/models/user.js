
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Message, {foreignKey: 'user_id'});

        // User.hasMany(models.Group_member, {foreignKey: 'user_id'});
      }
    }
  });
  return User;
};
