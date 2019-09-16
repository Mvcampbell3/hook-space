import React, { useState, useEffect } from "react";

import Picture from "../Picture";
import Flip from "../Flip";

import Loader from "../Loader";
import Landing from "../Landing";


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

  useEffect(() => {
    if (loaded === pics.length && pics.length > 0) {
      console.log("All loaded")
    }
  }, [loaded, pics])

  useEffect(() => {
    if (play && loaded === pics.length && pics.length > 0) {
      const pictures = [].slice.call(document.querySelectorAll(".flipPic"))
      // console.log(pictures)
      const sortedPictures = pictures.sort((a, b) => a.id - b.id)
      // console.log(sortedPictures);
      let pos = 0;
      const timer = setInterval(function() {
        if (pos >= sortedPictures.length) {
          clearInterval(timer);
          setPlay(false)
        } else {
          sortedPictures.forEach(one => one.style.zIndex = "5");
          sortedPictures[pos].style.zIndex = "10";
          pos++
        }
      }, 100)
    }
  }, [play, loaded, pics])


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

                  <div className="picFlipHolder">
                    <Flip blocker={true} />
                    {stash.map((image, i) =>
                      <Flip img_src={image.src} id={image.id} place={i} key={i} blocker={false} />)
                    }
                    <div className="flipControl">
                      <button onClick={() => setPlay(true)} className={play ? "selected" : ""}>Play</button>
                    </div>

                  </div>

                </div> : <div className="oneGrid"><Loader /></div>}
            </>
          </> : <></>}
        </>
        : <div className="oneGrid"><Landing /></div>}
    </div>
  )
}

export default RightSide;