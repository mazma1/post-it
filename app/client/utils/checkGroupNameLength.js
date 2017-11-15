/**
  * Function that truncates the name of a group
  * if it is longer than 13
  *
  * @param {string} groupName - Name of a group
  *
  * @returns {string} Group name, either transfrommed or not
  */
export default function checkGroupNameLength(groupName) {
  if (groupName.length > 13) {
    return `${groupName.substring(0, 13)}...`;
  }
  return groupName;
}

