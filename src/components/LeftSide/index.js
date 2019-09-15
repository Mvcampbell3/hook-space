import React, { useState, useEffect } from "react";

import "./leftSide.css"

import CameraButton from "../CameraButton";

const LeftSide = props => {

  const [checkButton, setCheckButton] = useState(false);

  useEffect(() => {
    if (checkButton === "flip") {
      props.setFlipBook(true);
      props.setRegDisplay(false);
      setCheckButton(false)
    } else if (checkButton === "reg") {
      props.setFlipBook(false);
      props.setRegDisplay(true);
      setCheckButton(false)
    }
  }, [checkButton, props])

  return (
    <div className="leftSide">
      <h3 className="text-center">Get Rover Pictures</h3>

      <div className="controlBox">
        <h5 className="text-center">Select Rover</h5>
        <div className="rover-button-group">
          <button
            onClick={() => {
              props.setRover("opportunity");
              props.setGetManifest(true);
            }}
            className={props.rover === "opportunity" ? "roverBtn selected" : "roverBtn"}>Opportunity</button>
          <button
            onClick={() => {
              props.setRover("spirit");
              props.setGetManifest(true);
            }}
            className={props.rover === "spirit" ? "roverBtn selected" : "roverBtn"}>Spirit</button>

        </div>

        {props.manifest ?
          <div className="solBox">
            <h5 className="text-center">Max Sol: {props.manifest.max_sol}</h5>
            <input placeholder="Enter Sol..."type="number" name="sol" autoComplete="off" onChange={e => props.setSol(e.target.value)} value={props.sol} />
          </div> : <></>}

        {props.cameras.length > 0 ?
          <div className="cameraButtons">
            <h5 className="text-center">Select Cameras</h5>
            <CameraButton key="allCamera" cam={"ALL"} setSelectedCamera={props.setSelectedCamera} selectedCamera={props.selectedCamera} />
            {props.cameras.map((cam, i) => <CameraButton key={i} cam={cam} setSelectedCamera={props.setSelectedCamera} selectedCamera={props.selectedCamera} />)}
          </div> : <></>}


        {props.selectedCamera ?
          <div className="displayButtons">
            <h5 className="text-center">Select Display</h5>
            <button onClick={() => setCheckButton("reg")} data-which="reg" className={props.regDisplay ? "selected" : ""}>Side by Side</button>
            <button onClick={() => setCheckButton("flip")} data-which="flip" className={props.flipBook ? "selected" : ""}>FlipBook</button>
          </div> : null}



        {props.flipBook ?
          <div className="sendBtnBox">
            <button onClick={() => { props.setGetPics(true) }} className="sendBtn">Get Pictures</button>
          </div>
          : null}
        {props.regDisplay ?
          <div className="sendBtnBox">
            <button onClick={() => { props.setGetPics(true) }} className="sendBtn">Get Pictures</button>
          </div>
          : null}
      </div>


    </div>
  )
}

export default LeftSide;