export default (sequelize, DataTypes) => {
  const Group_member = sequelize.define('Group_member', {
    group_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, { underscored: true });
  Group_member.associate = (models) => {

  };

  return Group_member;
};
