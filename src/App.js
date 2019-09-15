import React, { useState, useEffect } from 'react';
import './App.css';

const App = (props) => {

  const [pics, setPics] = useState([]);

  const [getPics, setGetPics] = useState(false);

  const [rover, setRover] = useState(null);

  useEffect(() => {
    if (getPics) {
      console.log("running http")
      let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=45&api_key=${process.env.REACT_APP_API_KEY}`
      fetch(url)
        .then(response => response.json())
        .then(info => {
          console.log(info.photos)
          setPics(info.photos);
          setGetPics(false);
        })
    }
  }, [getPics, rover])

  return (
    <div className="container">
      <Header />
      <LeftSide rover={rover} setRover={setRover} setGetPics={setGetPics} getPics={getPics} />
      <RightSide pics={pics} />
      <Footer />
    </div>
  );
}

const Header = props => {
  return (
    <header>
      <h1 className="brand">Rover Pics</h1>
    </header>
  )
}

const LeftSide = props => {

  return (
    <div className="leftSide">
      <h3>Get Rover Pictures</h3>

      <div className="button-group">
        <button onClick={() => { props.setRover("opportunity") }} className="roverBtn">Opportunity</button>
        <button onClick={() => { props.setRover("spirit") }} className="roverBtn">Spirit</button>
        <button onClick={() => { props.setRover("curiousity") }} className="roverBtn">Curiousity</button>
      </div>

      <h5>{props.rover ? props.rover : "Select Rover"}</h5>

      <button onClick={() => { props.setGetPics(true) }} className="sendBtn">Send</button>
      <h5>{props.getPics ? "true" : "false"}</h5>
    </div>
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
  // const { camera, earth_date, id, img_src, rover, sol } = props.pic;


  return (
    <div className="picture">
      {/* <h4>{camera.name}</h4> */}
      {/* <h5>{earth_date}</h5> */}
      {/* <h5>{id} id</h5> */}
      <img className="roverPicture" src={props.img_src} alt="rover" />
      {/* <h5>{rover}</h5> */}
      {/* <h5>{sol}</h5> */}
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
