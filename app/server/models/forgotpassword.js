export default (sequelize, DataTypes) => {
  const ForgotPassword = sequelize.define('ForgotPassword', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    hash: DataTypes.STRING,
    expiryTime: DataTypes.DATE
  });
  return ForgotPassword;
};
