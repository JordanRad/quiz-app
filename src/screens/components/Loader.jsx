import React from 'react';
import 'tachyons';
import Partciles from 'react-particles-js';
import particlesOptions from './particlesOptions';
import Heading from './Heading';

class Loader extends React.Component {
    render() {
        return (
            <div className="App">
                <Partciles
                    className="particles"
                    params={particlesOptions}
                />
                <Heading />
                <div className="f2 white">
                    Loading...
                </div>
                <div className="f4 white">
                    Loading...
                </div>
            </div>
        );
    }
}
export default Loader;