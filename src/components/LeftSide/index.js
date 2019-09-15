import React from "react";

import CameraButton from "../CameraButton";

const LeftSide = props => {

  return (
    <div className="leftSide">
      <h3>Get Rover Pictures</h3>

      <div className="button-group">
        <button
          onClick={() => {
            props.setRover("opportunity");
            props.setGetManifest(true);
          }}
          className={props.rover === "opportunity" ? "roverBtn selected": "roverBtn"}>Opportunity</button>
        <button
          onClick={() => {
            props.setRover("spirit");
            props.setGetManifest(true);
          }}
          className={props.rover === "spirit" ? "roverBtn selected": "roverBtn"}>Spirit</button>
        <button
          onClick={() => {
            props.setRover("curiosity");
            props.setGetManifest(true);
          }}
          className={props.rover === "curiosity" ? "roverBtn selected": "roverBtn"}>Curiosity</button>
      </div>

      {props.manifest ? <div>
        <h3>Max Sol: {props.manifest.max_sol}</h3>
        <input type="number" name="sol" autoComplete="off" onChange={e => props.setSol(e.target.value)} value={props.sol} />
      </div> : <></>}

      {props.cameras.length > 0 ?
        <div>
          <CameraButton key="allCamera" cam={"ALL"} setSelectedCamera={props.setSelectedCamera} selectedCamera={props.selectedCamera} />
          {props.cameras.map((cam, i) => <CameraButton key={i} cam={cam} setSelectedCamera={props.setSelectedCamera} selectedCamera={props.selectedCamera}/>)}
        </div> : <></>}


      <button onClick={() => props.setFlipBook(flipBook => flipBook = !flipBook)}>FlipBook</button>
      <button onClick={() => { props.setGetPics(true) }} className="sendBtn">Send</button>
      <h5>{props.flipBook ? "true" : "false"}</h5>
    </div>
  )
}

export default LeftSide;