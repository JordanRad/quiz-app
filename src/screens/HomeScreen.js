import React from 'react';
import '../App.css';
import 'tachyons';
import Partciles from 'react-particles-js';
import particlesOptions from './components/particlesOptions';
import history from './../services/history';
import Heading from './components/Heading';
class HomeScreen extends React.Component {
  constructor() {
    super();
  }
  ToggleClick(){
    history.push('./game');
  }
  render() {
    return (
      <div className="App">
        <Partciles
          className="particles"
          params={particlesOptions}
        />
        <Heading/>
        <button onClick={this.ToggleClick} className="btn btn-yellow">New Game</button>
      </div>
    );
  }
}
export default HomeScreen;
