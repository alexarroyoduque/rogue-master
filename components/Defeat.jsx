import React from 'react';

function Defeat({ onRestart }) {
  return (
    <div className="defeat-container">
      <h1><i className='icon-ko'></i></h1>
      <p>KO! Try again!</p>
      <button className='selectable' onClick={onRestart}>➤➤</button>
    </div>
  );
}

export default Defeat;
