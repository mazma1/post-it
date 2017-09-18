import React from 'react';
import PropTypes from 'prop-types';

/** Group members table component */
const GroupMembersTable = (props) => {
  const memberRow = props.groupMembers.map((member) => {
    return (
      <tr key={member.id}>
        <td>
          <b>{member.firstName} {member.lastName}</b> <br />
          @{member.username} | {member.email}
        </td>
      </tr>
    );
  });

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
