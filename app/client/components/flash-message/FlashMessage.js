import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * FlashMessage component
 * Parent component: FlashMessagesList
 */
class FlashMessage extends Component {

  /**
   * Constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.closeFlashMsg = this.closeFlashMsg.bind(this);
  }

  /**
   * Handles Close Flash Message event
   * @returns {void}
   */
  closeFlashMsg() {
    this.props.deleteFlashMessage(this.props.message.id);
  }

  /**
   * Render
   * @returns {ReactElement} Flash Message and Close Button markup
   */
  render() {
    const { id, type, text } = this.props.message;
    return (
      <div className={classnames('alert', {
        'alert-success': type === 'success',
        'alert-danger': type === 'error'
      })}>
        <button onClick={this.closeFlashMsg}className="close"><span>&times;</span></button>
        {text}
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};

export default FlashMessage;
