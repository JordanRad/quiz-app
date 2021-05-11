import React from 'react';
import Partciles from 'react-particles-js';
import '../App.css';
import particlesOptions from '../functions/particlesOptions';
import Heading from './components/Heading';
import history from './../services/history';
const FinishGameScreen = () => {

    const onClickHandler = (e) => history.push('./game')
    return (<div className="App">

        <Partciles
            className="particles"
            params={particlesOptions}
        />
        <Heading />
        <div className="f3 white m-3">
            You just finished the game sucessfully!!!
        </div>
        <button className="btn btn-yellow" onClick={onClickHandler}>
            Back to Game
        </button>
    </div>);
}

export default FinishGameScreen;