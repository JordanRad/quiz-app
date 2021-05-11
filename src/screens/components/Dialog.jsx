import React from 'react';

export default function Dialog(props) {
  let dialogClass = "col-lg-3 col-sm-10 p-2 box"
  if(props.open===false){
    dialogClass+=" invisible"
    
  }
  if(props.type==="ask the audience"){
    return(
      <div className={dialogClass}>
        <div className="text-white m-2">
          Audience said that "{props.answers[3]}" is the correct answer
        </div>
        <hr />
      </div>
    )
  }else{
    return (
      <div className={dialogClass}>
        <div className="text-white m-2">
          Your friend suggests "{props.answers[3]}" as a correct answer
        </div>
        <hr />
      </div>
    );
  }
  
}
