import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
// import swaggerFile from './swagger.yaml';
// const CustomerComponent = require('./components/customer-component.jsx');
import CustomerComponent from './components/customer-component';

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
      // <SwaggerUI url={swaggerFile} />
      <CustomerComponent />
    );
  }
}

export default App;
