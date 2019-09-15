import React, { useState, useEffect } from "react";

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
      <h3>Get Rover Pictures</h3>

      <div className="button-group">
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

      {props.manifest ? <div>
        <h3>Max Sol: {props.manifest.max_sol}</h3>
        <input type="number" name="sol" autoComplete="off" onChange={e => props.setSol(e.target.value)} value={props.sol} />
      </div> : <></>}

      {props.cameras.length > 0 ?
        <div>
          <CameraButton key="allCamera" cam={"ALL"} setSelectedCamera={props.setSelectedCamera} selectedCamera={props.selectedCamera} />
          {props.cameras.map((cam, i) => <CameraButton key={i} cam={cam} setSelectedCamera={props.setSelectedCamera} selectedCamera={props.selectedCamera} />)}
        </div> : <></>}


      {props.selectedCamera ? <div>
        <button onClick={() => setCheckButton("reg")} data-which="reg" className={props.regDisplay ? "selected" : ""}>Information Display</button>
        <button onClick={() => setCheckButton("flip")} data-which="flip" className={props.flipBook ? "selected" : ""}>FlipBook Display</button>
      </div> : null}



      {props.flipBook ? <button onClick={() => { props.setGetPics(true) }} className="sendBtn">Send</button> : null}
      {props.regDisplay ? <button onClick={() => { props.setGetPics(true) }} className="sendBtn">Send</button> : null}
    </div>
  )
}

export default LeftSide;