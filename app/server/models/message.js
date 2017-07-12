
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    body: DataTypes.TEXT
    group_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, { underscored: true }, {
    classMethods: {
      associate: (models) => {
        // Message.belongsTo(models.Users, { foreignKey: 'user_id' });
      }
    }
  });
  return Message;
};
