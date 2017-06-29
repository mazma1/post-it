import React from 'react';
import { BrowserRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';

const MessageCard = (props) => {
  return (
    <div>
      <div className="card-panel">
        <div className="">
          <span className="blue-text text-darken-2"><b>@mazma</b></span> <span class="blue-text text-darken-2">2:00pm</span>
        </div>
        <p className="msg_body">Hello ladies, who will be attending the Google I/O event on tommorrow?</p>
      </div>

      <div className="card-panel">
        <div className="">
          <span className="blue-text text-darken-2"><b>@mazma</b></span> <span class="blue-text text-darken-2">2:00pm</span>
        </div>
        <p className="msg_body">Hello ladies, who will be attending the Google I/O event on tommorrow?</p>
      </div>

      <div className="card-panel">
        <div className="">
          <span className="blue-text text-darken-2"><b>@mazma</b></span> <span class="blue-text text-darken-2">2:00pm</span>
        </div>
        <p className="msg_body">Hello ladies, who will be attending the Google I/O event on tommorrow?</p>
      </div>

      <div className="card-panel">
        <div className="">
          <span className="blue-text text-darken-2"><b>@mazma</b></span> <span class="blue-text text-darken-2">2:00pm</span>
        </div>
        <p className="msg_body">Hello ladies, who will be attending the Google I/O event on tommorrow?</p>
      </div>

      <div className="card-panel">
        <div className="">
          <span className="blue-text text-darken-2"><b>@mazma</b></span> <span class="blue-text text-darken-2">2:00pm</span>
        </div>
        <p className="msg_body">Hello ladies, who will be attending the Google I/O event on tommorrow?</p>
      </div>
    </div>
  );
};

module.exports = MessageCard;
