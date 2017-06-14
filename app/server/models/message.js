
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    body: DataTypes.TEXT,
    group_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.User, {foreignKey: 'user_id'});
        // Message.belongsTo(models.group, {foreignKey: 'grou_id'});
      }
    }
  });
  return Message;
};
