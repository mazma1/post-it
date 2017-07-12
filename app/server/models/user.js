
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, { underscored: true }, {
    classMethods: {
      associate: (models) => {
        // User.hasMany(models.Group, { foreignKey: 'user_id' });
      }
    }
  });
  return User;
};
