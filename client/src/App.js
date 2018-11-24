import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ApiService from './services/ApiService';

class App extends Component {


    constructor(props) {
        // Inherit constructor
        super(props);
        // State for form data and error message
        this.state = {}



    }

    componentDidMount(){

        ApiService.getBalance();
        ApiService.sayHello();

    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
