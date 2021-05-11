import React from 'react';
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