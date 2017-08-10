import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import split from 'lodash/split';

/** Group members table component */
class ReadByTable extends React.Component {

  /**
   * Render
   * @returns {ReactElement} Table markup
   */
  render() {
    const readByRow = this.props.messages.map((message) => {
      const readBy = message.read_by;
      const readByArray = split(readBy, ',');

      return (
        readByArray.map((username, index) => {
          return (
            <tr key={index}>
              <td>
                @{username}
              </td>
            </tr>
          );
        })
      );
    });

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
