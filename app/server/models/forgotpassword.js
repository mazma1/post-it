export default (sequelize, DataTypes) => {
  const ForgotPassword = sequelize.define('ForgotPassword', {
    user_id: DataTypes.INTEGER,
    hash: DataTypes.STRING,
    expiry_time: DataTypes.DATE
  }, { underscored: true });
  return ForgotPassword;
};
