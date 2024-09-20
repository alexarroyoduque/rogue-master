import React from 'react';

const AdvanceScreen = ({ onNext, goldReward, playerGold }) => {
  return (
    <div className="advance-screen">
      <h1><i className='icon-success' aria-describedby="success"></i></h1>
      <p>+{goldReward} <i className='icon-gold'></i> = {playerGold} <i className='icon-gold'></i></p>
      <button className='selectable' onClick={onNext}>➤➤</button>
    </div>
  );
};

export default AdvanceScreen;
