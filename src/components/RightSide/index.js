import React, { useState, useEffect } from "react";

import Loader from "../Loader";
import Landing from "../Landing";
import FlipSection from "../FlipSection";
import RegSection from "../RegSection";

const RightSide = props => {

  const { pics, setLoading } = props;

  let [stash, setStash] = useState([]);

  const [play, setPlay] = useState(false);


  useEffect(() => {
    if (pics.length > 0) {
      let loaded = 0;
      console.log("Loading Pictures")
      setStash(stash => [])
      pics.forEach((picture, i) => {
        const newImage = new Image();
        newImage.alt = "rover";
        newImage.className = "roverPic";
        newImage.src = picture.img_src;
        newImage.id = picture.id
        newImage.onload = () => {
          setStash(stash => [...stash, newImage])
          loaded++;
          if (loaded >= pics.length) {
            setLoading(false)
          }
        }
      })
    }

  }, [pics, setLoading])

  return (
    <div className="rightSide">

      {props.loading ? <div className="oneGrid"><Loader /></div> : <>

        {pics.length > 0 ?

          <div>
            {props.flipBook ? <div className="flipPlace"><FlipSection stash={stash} play={play} setPlay={setPlay} /></div>
              : <RegSection stash={stash} />}
          </div>

          : <div className="oneGrid"><Landing /></div>}

      </>}

    </div>
  )
}

export default RightSide;