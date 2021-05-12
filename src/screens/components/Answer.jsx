import React from 'react'
const Answer = (props) => {

    return (
        <button 
        onClick={props.validateHandler} 
        className="btn btn-yellow ml-5 mr-5 mt-3 mb-3 btn-lg">
            {props.content}
        </button>
    );
}
export default Answer