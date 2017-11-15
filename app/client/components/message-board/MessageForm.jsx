import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postNewMessage } from '../../actions/groupMessages';


/**
  * Displays Message Input Form
  *
  * @class MessageForm
  *
  * @extends {React.Component}
  */
export class MessageForm extends React.Component {

  /**
    * Creates an instance of MessageForm
    *
    * @param {object} props
    *
    * @memberof MessageForm
    */
  constructor(props) {
    super(props);

    this.state = {
      messageInput: '',
      priority: 'normal',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onMessageSend = this.onMessageSend.bind(this);
  }

  /**
   * Handles change event of message form
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

   /**
   * Handles change event of Priority Select input
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void}
   */
  onSelect(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Posts a message to the database if a group exists and message is not empty
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void}
   */
  onMessageSend(event) {
    event.preventDefault();
    const { groupId, username } = this.props;
    if (groupId && this.state.messageInput !== '') {
      const userMessage = this.state.messageInput;
      const validFlag = ['urgent', 'normal', 'critical'];
      const priority = userMessage.split(' ').shift().slice(1);

      if (validFlag.includes(priority)) {
        const messageBody = userMessage.slice(priority.length + 1);
        this.props.postNewMessage({
          priority,
          groupId,
          message: messageBody,
          readBy: username
        }).then(() => {
          this.setState({ messageInput: '' });
        }).catch(() => {
          toastr.error('Unable to send message, please try again');
        });
      } else {
        const { messageInput, priority } = this.state;
        this.props.postNewMessage({
          priority,
          groupId,
          message: messageInput,
          readBy: username
        }).then(() => {
          this.setState({ messageInput: '' });
        }).catch(() => {
          toastr.error('Unable to send message, please try again');
        });
      }
    }
  }

  /**
   * Render
   *
   * @returns {ReactElement} Message Input Form markup
   */
  render() {
    if (isEmpty(this.props.selectedGroup)) {
      return null;
    }
    return (
      <footer className="footer">
        <div className="footer-container">
          <form
            className="form-horizontal"
            id="chatform"
            onSubmit={this.onMessageSend}
          >
            <div className="form-group">
              <div
                className="col-lg-8 col-md-7 col-sm-6 col-xs-11 msg-form-container"
              >
                <input
                  className="form-control"
                  type="text"
                  id="m"
                  name="messageInput"
                  value={this.state.messageInput}
                  onChange={this.onChange}
                  placeholder="Enter your message..."
                  autoComplete="off"
                />
              </div>

              <div
                className="col-lg-3 col-md-3 col-sm-4 col-xs-11 priority-container"
              >
                <label>Priority</label>
                <select
                  className="browser-default"
                  name="priority"
                  onChange={this.onSelect}
                  value={this.state.priority}
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 msg-send-btn">
                <a
                  type="submit"
                  onClick={this.onMessageSend}
                  className="btn waves-effect waves-light blue lighten-1"
                >
                  Send
                </a>
              </div>
            </div>
          </form>
        </div>
      </footer>
    );
  }
}


/**
 * Maps pieces of the redux state to props in Sidebar
 *
 * @param {object} state Redux state
 *
 * @returns {object} authenticated user and active group details
 */
function mapStateToProps(state) {
  return {
    groupId: state.selectedGroup.id,
    username: state.signedInUser.user.username,
    selectedGroup: state.selectedGroup
  };
}


/**
 * Maps action creators to redux dispatch function and avails them as props
 *
 * @param {function} dispatch Redux dispatch function
 *
 * @returns {function} Action cretaors bound to redux dispatch function
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postNewMessage
  }, dispatch);
}

MessageForm.propTypes = {
  groupId: PropTypes.number.isRequired,
  postNewMessage: PropTypes.func.isRequired,
  selectedGroup: PropTypes.object.isRequired,
  username: PropTypes.string
};

MessageForm.defaultProps = {
  username: ''
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
