import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          I am a simple react app, running inside GCP AppEngine.
        </p>
        <a
          className="App-link"
          href="https://cloud.google.com/appengine"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn GCP AppEngine
        </a>
      </header>
    </div>
  );
}

export default App;
