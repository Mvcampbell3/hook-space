import React from 'react';

import Picture from "../Picture";

const RegSection = (props) => {
  return (
    <div className="picRegHolder">
      {props.stash.map(
        (image, i) => <Picture img_src={image.src} id={image.id} key={i} />)}
    </div>
  );
}

export default RegSection;