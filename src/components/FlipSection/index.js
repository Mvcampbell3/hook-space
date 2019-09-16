import React, { useEffect } from 'react';

import Flip from "../Flip";

const FlipSection = (props) => {

  const { play, setPlay } = props;

  useEffect(() => {
    let timer;
    if (play) {
      setPlay(true);
      const pictures = [].slice.call(document.querySelectorAll(".flipPic"))
      const sortedPictures = pictures.sort((a, b) => a.id - b.id)
      let pos = 0;
      timer = setInterval(function() {
        if (pos >= sortedPictures.length) {
          clearInterval(timer);
          setPlay(false)
        } else {
          sortedPictures.forEach(one => one.style.zIndex = "5");
          sortedPictures[pos].style.zIndex = "10";
          pos++
        }
      }, 150)
    }
    return () => {
      clearInterval(timer);
      setPlay(false);
    }
  }, [play, setPlay])

  return (
    <div className="picFlipHolder">
      <Flip blocker={true} />
      {props.stash.map((image, i) =>
        <Flip img_src={image.src} id={image.id} place={i} key={i} blocker={false} />)
      }
      <div className="flipControl">
        <button onClick={props.play ? null : () => props.setPlay(true)} className={props.play ? "selected" : ""}>Play</button>
      </div>
    </div>

  );
}

export default FlipSection;