import React from 'react';
// import './Monster.css'; // Asegúrate de tener los estilos necesarios
import ProgressBar from './ProgressBar';

const Monster = ({ monster }) => {
  return (
    <div className="monster-info">
      <h3><i className={`icon-${monster.icon}`}></i> {monster.name}</h3>
      <ProgressBar icon="heart" value={monster.health} max={monster.healthMax}/>
      <ProgressBar icon="shield" value={monster.defense} max={monster.defenseMax}/>
    </div>
  );
};

export default Monster;
