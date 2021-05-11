import React from 'react';
import '../App.css';
import 'tachyons';
import Partciles from 'react-particles-js';
import particlesOptions from './components/particlesOptions';
import history from '../services/history';
import Heading from './components/Heading';

const HomeScreen = () => {
  const handleClick = (e) => history.push('./game');
  
  return (
    <div className="App">
      <Partciles
        className="particles"
        params={particlesOptions}
      />
      <Heading />
      <div className={"mt-5 f4 white text-uppercase"}>
        <p className={"underline"}>Instructions:</p>
        <p>click New Game and you have one correct answer to every single question
        </p>
         you have 3 helpers which could lead you to the right answer
        </div>
      <button onClick={handleClick} className="mt-3 btn btn-lg btn-yellow">New Game</button>
    </div>
  );
}
export default HomeScreen;
