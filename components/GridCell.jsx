import React from 'react';

const GridCell = ({ type, onClick, defensePower, healthPower, attackPower, isSelected, disabled }) => {
  const displayPower = (power) => {
    // Mostrar el valor si es positivo, o 0 si es negativo
    return Math.max(power, 0);
  };

  return (
    <div 
      onClick={!disabled ? onClick : null} // Deshabilitamos el click si la celda está deshabilitada
      className={`grid-cell selectable ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
    >
      {type === 'attack' && (<><i className='icon-sword'></i> {displayPower(attackPower)}</>)}
      {type === 'defense' && (<><i className='icon-shield-plus'></i> {displayPower(defensePower)}</>)}
      {type === 'health' && (<><i className='icon-heart'></i> {displayPower(healthPower)}</>)}
    </div>
  );
};

export default GridCell;
