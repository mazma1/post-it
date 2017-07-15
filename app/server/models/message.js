
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    body: DataTypes.TEXT,
    group_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, { underscored: true });
  Message.associate = (models) => {
    Message.belongsTo(models.Group, { foreignKey: 'group_id' });
    // .setGroup() // .getGroup()
  };
  return Message;
};
