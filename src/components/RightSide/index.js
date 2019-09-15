import React, { useState, useEffect} from "react";

import Picture from "../Picture";


const RightSide = props => {

  const { pics } = props;

  let [loaded, setLoaded] = useState(0);

  let [stash, setStash] = useState([]);


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


  return (
    <div className="rightSide">
      {pics.length > 0 ?
        <div className="picHolder">
          {loaded === pics.length ? stash.map((image, i) => <Picture img_src={image.src} key={i} />): <h3>Loading...</h3>}
        </div>
        : <>Pictures will be here...</>}
    </div>
  )
}

export default RightSide;