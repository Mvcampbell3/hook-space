import React, { useState, useEffect } from "react";

import Picture from "../Picture";
import Flip from "../Flip";

import Loader from "../Loader";
import Landing from "../Landing";

import FlipSection from "../FlipSection";


const RightSide = props => {

  const { pics } = props;

  let [loaded, setLoaded] = useState(0);

  let [stash, setStash] = useState([]);

  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (pics.length > 0) {
      console.log("Loading Pictures")
      setLoaded(loaded => loaded = 0);
      setStash(stash => [])
      console.log("have pics")
      pics.forEach((picture, i) => {
        const newImage = new Image();
        newImage.alt = "rover";
        newImage.className = "roverPic";
        newImage.src = picture.img_src;
        newImage.id = picture.id
        newImage.onload = () => {
          setLoaded(loaded => loaded + 1);
          setStash(stash => [...stash, newImage])
        }
      })
    }

  }, [pics])

  return (
    <div className="rightSide">
      {pics.length > 0 ?
        <>
          {props.regDisplay ?
            <>
              {loaded === pics.length ?
                <div className="picRegHolder">
                  {stash.map(
                    (image, i) => <Picture img_src={image.src} id={image.id} key={i} />)}
                </div>
                :
                <div className="oneGrid"><Loader /></div>}
            </> : null}

          {props.flipBook ? <>
            <>
              {loaded === pics.length ?


                <div className="flipPlace">
                  <FlipSection
                    stash={stash}
                    // testFunction={testFunction}
                    play={play}
                    setPlay={setPlay}
                  />


                  {/* <div className="picFlipHolder">
                    <Flip blocker={true} />
                    {stash.map((image, i) =>
                      <Flip img_src={image.src} id={image.id} place={i} key={i} blocker={false} />)
                    }
                    <div className="flipControl">
                      <button onClick={play ? null : () => testFunction()} className={play ? "selected" : ""}>Play</button>
                    </div>

                  </div> */}

                </div> : <div className="oneGrid"><Loader /></div>}
            </>
          </> : <></>}
        </>
        : <div className="oneGrid"><Landing /></div>}
    </div>
  )
}

export default RightSide;