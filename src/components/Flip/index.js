import React from 'react';

const Flip = (props) => {
  return (
    <div className="flip">
      {props.blocker ? <div className="flipBlocker"></div> : <img src={props.img_src} id={props.id} className="flipPic" alt="flipPic" />}
    </div>
  );
}

export default Flip;