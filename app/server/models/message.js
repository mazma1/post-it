
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    group_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.User);
      }
    }
  });
  return Message;
};
