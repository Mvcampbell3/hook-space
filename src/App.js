import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <Header />
      <LeftSide />
      <RightSide />
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
      <h3>{process.env.GATSBY_REACT_APP_API_KEY}</h3>
    </div>
  )
}

const RightSide = props => {
  return (
    <div className="rightSide">

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
