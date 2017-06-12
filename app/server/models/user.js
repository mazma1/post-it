
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: DataTypes.INTEGER,
    email: DataTypes.VARCHAR,
    username: DataTypes.VARCHAR,
    password: DataTypes.VARCHAR
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
