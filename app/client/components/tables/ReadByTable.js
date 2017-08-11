import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import split from 'lodash/split';
import mapKeys from 'lodash/mapKeys';

/** Group members table component */
class ReadByTable extends React.Component {

  /**
   * Render
   * @returns {ReactElement} Table markup
   */
  render() {
    const messagesArray = this.props.messages;
    const messagesObject = mapKeys(messagesArray, 'message_id');
    const messageId = this.props.messageId;
    const readByUsers = messagesObject[messageId];
    let readByRow;

    if (readByUsers) {
      const readBy = readByUsers.read_by;
      const readByArray = split(readBy, ',');

      readByRow = readByArray.map((username, index) => {
        return (
          <tr key={index}>
            <td>
              @{username}
            </td>
          </tr>
        );
      });
    }

    return (
      <div>
        <table className="striped">
          <tbody>
            {readByRow}
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
    messages: state.groupMessages.messages
  };
}

ReadByTable.propTypes = {
  readBy: PropTypes.string
};

export default connect(mapStateToProps)(ReadByTable);
