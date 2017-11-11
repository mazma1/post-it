import React from 'react';
import PropTypes from 'prop-types';


/**
  * Displays list of users in a group
  *
  * @class GroupMembersTable
  *
  * @extends {React.Component}
  */
const GroupMembersTable = (props) => {
  const memberRow = props.groupMembers.map(member => (
    <tr key={member.id}>
      <td>
        <b>{member.firstName} {member.lastName}</b> <br />
        @{member.username} | {member.email}
      </td>
    </tr>
  )
);

  return (
    <div>
      <table className="striped">
        <tbody>
          {memberRow}
        </tbody>
      </table>
    </div>
  );
};

GroupMembersTable.propTypes = {
  groupMembers: PropTypes.array.isRequired
};

export default GroupMembersTable;
