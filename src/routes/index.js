import React from 'react';
import { Switch} from 'react-router-dom';
import Route from '../routes/Route';
import GameScreen from '../screens/GameScreen'
import HomeScreen from '../screens/HomeScreen';

export default class Router extends React.Component {

    render() {
        return (
            <Switch>
                <Route path='/' exact component={HomeScreen}></Route>
                <Route path='/game' component={GameScreen}></Route>

                <Route component={HomeScreen}></Route>
            </Switch>
        );
    }
}