import React from 'react';

const Picture = props => {
  return (
    <div className="picture">
      <img className="roverPicture" src={props.img_src} alt="rover" />
    </div>
  );
}

export default Picture;