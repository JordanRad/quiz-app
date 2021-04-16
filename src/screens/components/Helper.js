import React from 'react';
import 'tachyons';
// class Helper extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         console.log(this.props)
//         return 
//     }
// }
// export default Helper;
const Helper = (props)=>{
    return(
        <button
            onClick={props.handle}
            className="btn btn-primary m-1 btn-lg"
            disabled={props.disabled} >
            {props.content}
        </button>
    );
}
export default Helper;