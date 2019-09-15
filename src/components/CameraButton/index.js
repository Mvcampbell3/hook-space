import React from "react";

const CameraButton = (props) => {
  return ( 
    <button data-cam={props.cam} onClick={()=> props.setSelectedCamera(props.cam)}>{props.cam}</button>
   );
}
 
export default CameraButton;