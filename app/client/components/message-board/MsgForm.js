import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { postNewMessage } from '../../actions/groupMessagesAction';
import { addFlashMessage } from '../../actions/flashMessageAction';

class MsgForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageInput: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onMessageSend = this.onMessageSend.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onMessageSend(e) {
    e.preventDefault();
    const { groupId, userId } = this.props;
    if (groupId && this.state.messageInput !== '') {
      this.props.postNewMessage({
        message: this.state.messageInput,
        group_id: groupId
      }).then(() => {
        this.setState({ messageInput: '' });
      }).catch(() => {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Unable to send message, please try again'
        });
      });
    }
  }

  render() {
    return (
      <footer className="footer">
        <div className="footer-container">
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-lg-11 col-md-10 col-sm-11 col-xs-11">
                <input 
                  className="form-control"
                  type="text" 
                  name="messageInput"
                  value={this.state.messageInput} 
                  onChange={this.onChange} 
                  placeholder="Enter your message..." 
                />
              </div>

              <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 msg-send-btn">
                <a 
                  href='#' 
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

function mapStateToProps(state) {
  return {
    groupId: state.selectedGroup.id,
    userId: state.signedInUser.id
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postNewMessage,
    addFlashMessage
  }, dispatch);
}
MsgForm.propTypes = {
  groupId: PropTypes.number,
  postNewMessage: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MsgForm);
