import React from "react";

const CameraButton = (props) => {
  return (
    <button
      className={props.selectedCamera === props.cam ? "camBtn selected" : "camBtn"}
      data-cam={props.cam}
      onClick={() => props.setSelectedCamera(props.cam)}>
      {props.cam}
    </button>
  );
}

export default CameraButton;