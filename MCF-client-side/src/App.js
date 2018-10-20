import React, { Component } from 'react';
import './App.css';
import FMResponse from './FMresponse';
import Patron from './Patron';

export default class App extends Component {

  render() {
    return (
      <React.Fragment>
        <div>
          <Patron />
          <FMResponse />
        </div>
      </React.Fragment>
    );
  }
}
