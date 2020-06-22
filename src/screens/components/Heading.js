import React from 'react';
import 'tachyons';


class Heading extends React.Component {
    render() {
        return (
            <div>
                <div className="f1 white mb-2">Who wants to be a millionaire?</div>
                <div className="f5 white text-uppercase">simple game app made by Jordan Radushev</div>
            </div>
        );
    }
}
export default Heading;