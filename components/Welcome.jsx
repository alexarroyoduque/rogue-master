import React from 'react';
import './Welcome.css'; // Asume que tienes un archivo CSS para los estilos

function Welcome({ onStart }) {
  return (
    <div className="welcome-container">
      <h1 className="title">ROGUE MASTER</h1>
      <div className='options'>
        <button className="play selectable" onClick={onStart}>PLAY</button>
        <p>In next version</p>
        <button className="selectable disabled">SHOP</button>
        <button className="selectable disabled">BESTIARY</button>
      </div>
      <p>React project by @AlexArroyoDuque</p>
      <p>Version: 0.0.1 (demo)</p>
    </div>
  );
}

export default Welcome;
