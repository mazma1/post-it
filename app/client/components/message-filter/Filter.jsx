import React from 'react';

class MessageFilter extends React.Component {
  render() {
    return (
      // <div>
        <div className="col-lg-2 col-md-10 col-sm-11 col-xs-11 priority-container">
          {/* <label>Priority</label> */}
          <select className="browser-default" name="priority">
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      // </div>
    );
  }
}

export default MessageFilter;
