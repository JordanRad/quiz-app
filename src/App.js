import React from 'react';
import './App.css';
import {Router} from 'react-router-dom';
import Routes from './routes';
import history from './services/history';

export default class App extends React.Component{
  render(){
    return(
      <Router history = {history}>
        <Routes/>
      </Router>
    );
  }
}


