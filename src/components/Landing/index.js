import React from 'react';
import "./landing.css"
const Landing = (props) => {
  return (
    <div className="bgLanding">
      <div className="landingPage">
        <h3>Rover Picture Viewer</h3>
        <p>This site is all about Spirit's and Opportunity's pictures they have sent back to Earth from their missions on Mars. Use the control panel to select which rover, sol, and cameras you would like to see. Finally, there is an option for a flip book or side by side display. The side by side display will give you pictures as well as information about the picture. It will also maintain the correct aspect ratio for the picture. The flipbook option flips through all of the images that you select to be displayed. Using both displays, you can learn a lot about what these rovers were doing on another world. Enjoy!</p>

      </div>
    </div>

  );
}

export default Landing;