import React from 'react';
import ProgressBar from './ProgressBar';


const Player = ({ player }) => {
  const getModifiedValue = (baseValue, modifier) => {
    const newValue = baseValue + modifier;
    return modifier >= 0 ? `(+${modifier})` : `(${modifier})`;
  };

  const attackBonus = player.inventory.reduce((sum, item) => item.effect === 'attack' ? sum + item.value : sum, 0);
  const defenseBonus = player.inventory.reduce((sum, item) => item.effect === 'defense' ? sum + item.value : sum, 0);

  return (
    <div className="player-info">
      <h3><i className={`icon-warrior`}></i>Player</h3>
      <ProgressBar icon="heart" value={player.health} max={player.healthMax} />
      <ProgressBar icon="shield" value={player.defense} max={player.defenseMax} />
      
      <p>
        <i className={`icon-sword`}></i>{player.attack} {getModifiedValue(player.attack, attackBonus)}
        <i className={`icon-shield-plus`}></i>{player.defensePower} {getModifiedValue(player.defense, defenseBonus)}
      </p>
      <p>
        <i className={`icon-gold`}></i>{player.gold}
      </p>

      <div className="inventory">
        {player.inventory.map((item, index) => (
          <div key={index} className="inventory-item">
            <p><i className={`icon-${item.name}`}></i>=<i className={`icon-${item.effectIcon}`}></i>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Player;
