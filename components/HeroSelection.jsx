import React from 'react';
import './HeroSelection.css';

function HeroSelection({ onHeroSelect }) {
  const heroes = [
    {
      name: 'warrior',
      health: 20,
      healthMax: 20,
      healthPower: 1,
      attack: 4,
      magic: 0,
      actions: ['attack', 'defense'],
      defense: 0,
      defensePower: 2,
      defenseMax: 10,
      level: 1,
      grid: 3,
      gridSelection: 2,
      gold: 0,
      inventory: []
    },
    {
      name: 'warlock',
      health: 3,
      healthPower: 1,
      healthMax: 15,
      attack: 2,
      magic: 2,
      actions: ['attack', 'defense', 'fire'],
      defense: 1,
      defensePower: 1,
      defenseMax: 5,
      level: 1,
      grid: 3,
      gridSelection: 2,
      gold: 0,
      inventory: [],
      isDisabled: true,
      unlock: 'Unlocked in next version'
    }
  ];
  
  const actionIcons = {
    attack: 'sword',
    defense: 'shield-plus',
    fire: 'fire'
  };

  return (
    <div className="hero-container">
      {heroes.map((hero, index) => (
        <div key={index} className={`hero-card selectable ${hero.isDisabled ? 'disabled' : ''}`} onClick={() => onHeroSelect(hero)}>
          <h2><i className={`icon-${hero.name}`}></i> {hero.name}</h2>
          <div className="description">
            <p><i className='icon-heart'></i> {hero.healthMax} <i className='icon-shield'></i> {hero.defenseMax}</p>
            <p>
              <i className='icon-sword'></i> {hero.attack}
              {hero.magic ? <><i className='icon-fire'></i> {hero.magic}</> : ''} 
              <i className='icon-shield-plus'></i> +{hero.defensePower}
            </p>
            <p>Grid: {hero.grid}</p>
            <p>Turn actions: {hero.gridSelection}</p>
            <p>Actions: 
              {hero.actions.map((action, idx) => (
                <i key={idx} className={`icon-${actionIcons[action]}`}></i>
              ))}
            </p>
          </div>
          <p className='unlock'>{hero.unlock ? hero.unlock : ''}</p>
        </div>
      ))}
    </div>
  );
}

export default HeroSelection;
