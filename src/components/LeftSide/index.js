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
          className="roverBtn">Opportunity</button>
        <button
          onClick={() => {
            props.setRover("spirit");
            props.setGetManifest(true);
          }}
          className="roverBtn">Spirit</button>
        <button
          onClick={() => {
            props.setRover("curiosity");
            props.setGetManifest(true);
          }}
          className="roverBtn">Curiosity</button>
      </div>

      <h5>{props.rover ? props.rover : "Select Rover"}</h5>

      {props.manifest ? <div>
        <h3>Max Sol: {props.manifest.max_sol}</h3>
        <input type="number" name="sol" autoComplete="off" onChange={e => props.setSol(e.target.value)} value={props.sol} />
      </div> : <></>}

      {props.cameras.length > 0 ?
        <div>
          <CameraButton key="allCamera" cam={"ALL"} setSelectedCamera={props.setSelectedCamera} />
          {props.cameras.map((cam, i) => <CameraButton key={i} cam={cam} setSelectedCamera={props.setSelectedCamera} />)}
        </div> : <></>}

      <button onClick={() => { props.setGetPics(true) }} className="sendBtn">Send</button>
      <h5>{props.getPics ? "true" : "false"}</h5>
    </div>
  )
}

export default LeftSide;