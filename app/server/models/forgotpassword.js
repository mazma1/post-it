module.exports = (sequelize, DataTypes) => {
  const ForgotPassword = sequelize.define('ForgotPassword', {
    user_id: DataTypes.INTEGER,
    hash: DataTypes.STRING,
    expiry_time: DataTypes.DATE
  }, { underscored: true });
  // ForgotPassword.associate = (models) => {
  //   ForgotPassword.hasMany(models.User, { foreignKey: 'user_id' });
  // };
  return ForgotPassword;
};
