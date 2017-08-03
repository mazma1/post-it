import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/** Group members table component */
class Table extends React.Component {

  /**
   * Render
   * @returns {ReactElement} Table markup
   */
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

/**
 * Maps pieces of the redux state to props
 * @param {object} state Redux state
 * @returns {object} Members of a selected group
 */
function mapStateToProps(state) {
  return {
    groupMembers: state.groupMembers.members
  };
}

Table.propTypes = {
  groupMembers: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Table);
