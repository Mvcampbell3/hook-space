import React, { useState, useEffect } from 'react';
import './App.css';

import LeftSide from "./components/LeftSide";

const App = (props) => {

  const [pics, setPics] = useState([]);

  const [getPics, setGetPics] = useState(false);

  const [rover, setRover] = useState(null);

  const [manifest, setManifest] = useState(null);

  const [getManifest, setGetManifest] = useState(false)

  const [sol, setSol] = useState("")

  const [cameras, setCameras] = useState([]);

  const [selectedCamera, setSelectedCamera] = useState(null);

  useEffect(() => {
    if (getPics) {

      console.log("running http pictures")

      let url;

      if (selectedCamera === "ALL") {
        url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${process.env.REACT_APP_API_KEY}`;
      } else {
        url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${selectedCamera}&api_key=${process.env.REACT_APP_API_KEY}`;
      }

      fetch(url)
        .then(response => response.json())
        .then(info => {
          console.log(info.photos)
          setPics(info.photos);
          setGetPics(false);
        })
    }
  }, [getPics, rover, sol, selectedCamera])

  useEffect(() => {
    if (getManifest) {
      console.log("running http manifest")
      setManifest(null);
      let url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${process.env.REACT_APP_API_KEY}`;
      fetch(url)
        .then(response => response.json())
        .then(fetchedManifest => {
          console.log(fetchedManifest.photo_manifest);
          setManifest(fetchedManifest.photo_manifest)
          setGetManifest(false)
        })
    }
  }, [rover, getManifest])

  useEffect(() => {
    setCameras([]);
    if (sol && manifest) {
      const rightSol = manifest.photos.filter(each => each.sol.toString() === sol);
      if (rightSol.length > 0) {
        console.log(rightSol[0].cameras)
        setCameras(rightSol[0].cameras);
      }

    }
  }, [sol, manifest])

  // --------------------------------------RETURN______________________________
  return (
    <div className="container">
      <Header />
      <LeftSide
        rover={rover}
        setRover={setRover}
        setGetPics={setGetPics}
        getPics={getPics}
        setGetManifest={setGetManifest}
        manifest={manifest}
        sol={sol}
        setSol={setSol}
        cameras={cameras}
        setCameras={setCameras}
        setSelectedCamera={setSelectedCamera}
      />
      <RightSide pics={pics} />
      <Footer />
    </div>
  );
}

//-----------------------------------------END RETURN___________________________

const Header = props => {
  return (
    <header>
      <h1 className="brand">Rover Pics</h1>
    </header>
  )
}

const RightSide = props => {

  const { pics } = props;

  return (
    <div className="rightSide">
      {pics.length > 0 ? <div className="picHolder">
        {pics.map((pic, i) => <Picture key={i} img_src={pic.img_src} />)}
      </div> : <>Loading...</>}
    </div>
  )
}

const Picture = props => {
  return (
    <div className="picture">
      <img className="roverPicture" src={props.img_src} alt="rover" />
    </div>
  )
}

const Footer = props => {
  return (
    <footer>
      Michael Campbell
    </footer>
  )
}

export default App;
