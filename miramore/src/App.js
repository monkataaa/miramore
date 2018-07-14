import React, { Component } from 'react';
import './styles/App.css';
import './styles/notifications.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Routes from './components/general/Routes'
import Navigation from './components/general/Navigation';
import Notification from './components/general/Notification'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoged : localStorage.getItem('token') !== null,
    }
  }
  
  render() {
    return (
      <Router>
        <div>
          
          <Notification />
          <Navigation />
          <Routes />
       
        </div>

      </Router>

    );
  }
}

export default App;
