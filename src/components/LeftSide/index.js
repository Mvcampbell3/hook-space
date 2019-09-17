import React, { useState, useEffect } from "react";

import "./leftSide.css"

import CameraButton from "../CameraButton";

const LeftSide = props => {

  const { loading, pics } = props;

  const [checkButton, setCheckButton] = useState(false);
  const [btnSelected, setBtnSelected] = useState(false);

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

  useEffect(() => {
    console.log("running btn eval")
    if (loading || pics.length > 0) {
      setBtnSelected(true)
    } else {
      setBtnSelected(false);
    }
  }, [loading, pics])

  const loadingTrue = () => {
    props.setGetPics(true);
    props.setLoading(true);
  }

  return (
    <div className="leftSide">
      <div className="controlBox">
        <h5 className="text-center controlTitle">Select Rover</h5>
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
            <h5 className="text-center controlTitle">Max Sol: {props.manifest.max_sol}</h5>
            <input placeholder="Enter Sol..." type="number" name="sol" autoComplete="off" onChange={e => props.setSol(e.target.value)} value={props.sol} />
          </div> : <></>}

        {props.cameras.length > 0 ?
          <div className="cameraButtons">
            <h5 className="text-center controlTitle">Select Cameras</h5>
            <CameraButton key="allCamera" cam={"ALL"} setSelectedCamera={props.setSelectedCamera} selectedCamera={props.selectedCamera} />
            {props.cameras.map((cam, i) => <CameraButton key={i} cam={cam} setSelectedCamera={props.setSelectedCamera} selectedCamera={props.selectedCamera} />)}
          </div> : <></>}


        {props.selectedCamera ?
          <div className="displayButtons">
            <h5 className="text-center controlTitle">Select Display</h5>
            <div className="disBtns">
              <button onClick={() => setCheckButton("reg")} data-which="reg" className={props.regDisplay ? "selected" : ""}>Side by Side</button>
              <button onClick={() => setCheckButton("flip")} data-which="flip" className={props.flipBook ? "selected" : ""}>FlipBook</button>
            </div>
          </div> : null}



        {props.flipBook ?
          <div className="sendBtnBox">
            <button onClick={() => { loadingTrue() }} className={btnSelected ? "selected sendBtn" : "sendBtn"}>Get Pictures</button>
          </div>
          : null}
        {props.regDisplay ?
          <div className="sendBtnBox">
            <button onClick={() => { loadingTrue() }} className={btnSelected ? "selected sendBtn" : "sendBtn"}>Get Pictures</button>
          </div>
          : null}
      </div>


    </div>
  )
}

export default LeftSide;