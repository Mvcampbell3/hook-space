import React, { useState, useEffect } from 'react';
import './App.css';

import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import Header from "./components/Header";

const App = () => {

  // Use State Hooks

  const [pics, setPics] = useState([]);

  const [getPics, setGetPics] = useState(false);

  const [rover, setRover] = useState(null);

  const [manifest, setManifest] = useState(null);

  const [getManifest, setGetManifest] = useState(false)

  const [sol, setSol] = useState("")

  const [cameras, setCameras] = useState([]);

  const [selectedCamera, setSelectedCamera] = useState(null);

  const [flipBook, setFlipBook] = useState(false);

  const [regDisplay, setRegDisplay] = useState(false);

  const [loading, setLoading] = useState(false);

  // Use Effect Hooks

  // Grabbing Pictures from http request

  useEffect(() => {
    if (getPics) {
      setLoading(true);
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
          setPics(info.photos);
          setGetPics(false);
        })
    }
  }, [getPics, rover, sol, selectedCamera])

  // Grab manifest

  useEffect(() => {
    if (getManifest) {
      console.log("running http manifest")
      setCameras([]);
      setSelectedCamera(null)
      setPics([])
      setSol("")
      setManifest(null);
      setFlipBook(false);
      setRegDisplay(false);
      let url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${process.env.REACT_APP_API_KEY}`;
      fetch(url)
        .then(response => response.json())
        .then(fetchedManifest => {
          setManifest(fetchedManifest.photo_manifest)
          setGetManifest(false)
        })
    }
  }, [rover, getManifest])

  // Set Cameras based on sol input vs. manifest

  useEffect(() => {
    setCameras([]);
    setSelectedCamera(null);
    setFlipBook(false);
    setRegDisplay(false);
    if (sol && manifest) {
      const rightSol = manifest.photos.filter(each => each.sol.toString() === sol);
      if (rightSol.length > 0) {
        setCameras(rightSol[0].cameras);
      }

    }
  }, [sol, manifest])

  // When selectedCamera changed, clear pics so landing in displayed on right side

  useEffect(() => {
    setPics([])
  }, [selectedCamera])

  // Control Loading Screen display

  useEffect(() => {
    if (loading) {

    }
  })

  // Return Statement

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
        selectedCamera={selectedCamera}
        setSelectedCamera={setSelectedCamera}
        flipBook={flipBook}
        setFlipBook={setFlipBook}
        regDisplay={regDisplay}
        setRegDisplay={setRegDisplay}
        loading={loading}
        setLoading={setLoading}
        pics={pics}
      />
      <RightSide
        pics={pics}
        flipBook={flipBook}
        regDisplay={regDisplay}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}

export default App;
