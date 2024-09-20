import React from 'react';

function Victory({ onRestart }) {
  return (
    <div className="victory-container">
      <h1><i className='icon-flag'></i></h1>
      <p>Congratulations! Route completed!</p>
      <button className='selectable' onClick={onRestart}>➤➤</button>
    </div>
  );
}

export default Victory;
