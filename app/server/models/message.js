
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    body: DataTypes.TEXT,
    group_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    priority: DataTypes.TEXT
  }, { underscored: true });
  Message.associate = (models) => {
    Message.belongsTo(models.Group, { foreignKey: 'group_id' });
    // User is associated to message
    Message.belongsTo(models.User, { as: 'sent_by', foreignKey: 'user_id' });
  };
  return Message;
};
