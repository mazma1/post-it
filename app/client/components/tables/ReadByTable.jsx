import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import split from 'lodash/split';
import mapKeys from 'lodash/mapKeys';

/** Table of users that have read a message */
class ReadByTable extends React.Component {

  /**
   * Render
   * @returns {ReactElement} Table markup
   */
  render() {
    const messagesArray = this.props.messages;
    const messagesObject = mapKeys(messagesArray, 'id');
    const messageId = this.props.messageId;
    const readByUsers = messagesObject[messageId];
    let readByRow;

    if (readByUsers) {
      const { readBy } = readByUsers;
      const readByArray = split(readBy, ',');

      readByRow = readByArray.map((username, index) => (
        <tr key={index}>
          <td>
            @{username}
          </td>
        </tr>
      ));
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
 * @returns {object} A specified group's messages
 */
function mapStateToProps(state) {
  return {
    messages: state.groupMessages.messages
  };
}

ReadByTable.propTypes = {
  messageId: PropTypes.number.isRequired,
  messages: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(ReadByTable);
