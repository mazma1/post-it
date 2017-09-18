export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    priority: {
      type: DataTypes.TEXT,
      defaultValue: 'normal',
      allowNull: false,
      validate: {
        isIn: [['normal', 'urgent', 'critical']]
      }
    },
    readBy: DataTypes.TEXT,
    isArchived: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  });
  Message.associate = (models) => {
    Message.belongsTo(models.Group, { foreignKey: 'groupId' });
    Message.belongsTo(models.User, { as: 'sentBy', foreignKey: 'userId' });
  };
  return Message;
};
