import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlashMessage from './FlashMessage';
import { deleteFlashMessage } from '../../actions/flashMessage';

/**
 * FlashMessagesList component
 * Child component: FlashMessage
 */
class FlashMessageList extends React.Component {

  /**
   * Render
   * @returns {ReactElement} Array of FlashMessages
   */
  render() {
    const messages = this.props.messages.map(message =>
      <FlashMessage
        key={message.id}
        message={message}
        deleteFlashMessage={this.props.deleteFlashMessage} 
      />
    );
    return (
      <div className='flash-msg'>{messages}</div>
    );
  }
}

/**
 * Maps pieces of the redux state to props
 * Whatever is returned will show up as props in FlashMessagesList
 * @param {object} state Redux state
 * @returns {object} Available flash messages
 */
function mapStateToProps(state) {
  return {
    messages: state.flashMessages
  };
}

FlashMessageList.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessageList);
