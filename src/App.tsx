import React from 'react';
import logo from './music-vine-logo.png';
import needle from './needle-2.png'
import './App.css';
import MusicCards from './components/MusicCards/MusicCards';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='app-logo-vinyl'><img className='needle' src={needle} alt='needle'/><div><img src={logo} className="App-logo" alt="logo" /></div></div>
        
        
      </header>
      <body className='App-body'>
      <MusicCards />
      </body>
    </div>
  );
}

export default App;
