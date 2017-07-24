import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  render() {
    const memberRow = this.props.groupMembers.map((member) => {
      return (
        <tr key={member.id}>
          <td>
            <b>{member.firstname} {member.lastname}</b> <br />
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
  }
}

function mapStateToProps(state) {
  return {
    groupMembers: state.groupMembers.members
  };
}

Table.propTypes = {

};

export default connect(mapStateToProps)(Table);
