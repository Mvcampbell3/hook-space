import React, { useState, useEffect } from "react";

import Picture from "../Picture";
import Flip from "../Flip";


const RightSide = props => {

  const { pics } = props;

  let [loaded, setLoaded] = useState(0);

  let [stash, setStash] = useState([]);

  const [play, setPlay] = useState(false);

  useEffect(() => {
    console.log(pics.length)
    if (pics.length > 0) {
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
          console.log("loaded " + i);
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
      const timer = setInterval(function(){
        if (pos >= sortedPictures.length) {
          clearInterval(timer);
          setPlay(false)
        } else {
          sortedPictures.forEach(one => one.style.zIndex = "5");
          sortedPictures[pos].style.zIndex="10";
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
              <div className="picRegHolder">
                {loaded === pics.length ? stash.map((image, i) => <Picture img_src={image.src} id={image.id} key={i} />) : <h3>Loading...</h3>}
              </div>
            </> : <></>}
          {props.flipBook ? <>
            <div className="picFlipHolder">
                {loaded === pics.length ? <Flip blocker={true} />: null}
                {loaded === pics.length ? stash.map((image, i) => <Flip img_src={image.src} id={image.id} place={i} key={i} blocker={false} />): <h3>Loading Flip...</h3>}
                {loaded === pics.length ? 
                <div className="flipControl">
                  <button onClick={() => setPlay(true)} className={play ? "selected": ""}>Play</button>
                </div> : null
                }
            </div>
          </> : <></>}
        </>
        : <>Pictures will be here...</>}
    </div>
  )
}

export default RightSide;