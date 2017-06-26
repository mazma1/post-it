import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Client from './Client';

export default class AppRoutes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={Client}/>
      </BrowserRouter>
    );
  }
}
