
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Message, {
          foreignKey: 'user_id',
          as: 'messages',
        });

        User.hasMany(models.Group_member);
      }
    }
  });
  return User;
};
