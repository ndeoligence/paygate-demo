import React from 'react';
import logo from './logo.svg';
import './App.css';
import PayWeb from "./paygate/payweb";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PayWeb/>
      </header>
    </div>
  );
}

export default App;
