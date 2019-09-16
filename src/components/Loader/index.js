import React, {useEffect} from 'react';

import "./loader.css";

const Loader = (props) => {

  useEffect(() => {
    const mars = document.getElementById("mars");
    mars.animate({
      transform: ["scale(1) translateX(0px)", 
      "scale(.50) translateX(200px)",
      "scale(.25) translateX(0px)",
      "scale(.50) translateX(-200px)",
      "scale(1) translateX(0px)"
    ],
      zIndex: ["5", "1", "1", "1", "5"]
    }, {
      duration: 5000,
      fill: "forwards",
      iterations: "Infinity"
    })
  }, [])



  return ( 
    <div className="loaderHolder">
      <div className="circle"></div>
      <div id="mars" className="mars"></div>
    </div>
   );
}
 
export default Loader;