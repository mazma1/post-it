import React from 'react';

class MsgForm extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-container">
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-lg-11 col-md-10 col-sm-11 col-xs-11">
                <input type="text" className="form-control" id="groupMessage" placeholder="Enter your message..." />
              </div>

              <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 msg-send-btn">
                <button type="submit" className="btn waves-effect waves-light blue lighten-1">Send</button>
              </div>
            </div>
          </form>
        </div>
      </footer>
    );
  }
}

module.exports = MsgForm;
