import React from 'react';

const PlayerActionHandler = ({ player, setMonster, setPlayer }) => {

  const handlePlayerAttack = () => {
    // Calcula el poder de ataque final considerando los objetos que afectan el ataque
    const totalAttackPower = player.attack + (player.inventory
      .filter(item => item.effect === 'attack')
      .reduce((sum, item) => sum + item.value, 0));
    
    setMonster((prevMonster) => {
      const damageToDefense = Math.min(prevMonster.defense, totalAttackPower); // Usa el poder de ataque ajustado
      const newDefense = prevMonster.defense - damageToDefense;
  
      let newHealth = prevMonster.health;
      if (newDefense <= 0) {
        const remainingDamage = totalAttackPower - damageToDefense;
        newHealth = Math.max(prevMonster.health - remainingDamage, 0);
      }
  
      return {
        ...prevMonster,
        defense: newDefense,
        health: newHealth,
      };
    });
  
  };

  const handlePlayerDefense = () => {
    setPlayer((prevPlayer) => {
      const totalDefensePower = prevPlayer.defensePower + (prevPlayer.inventory
        .filter(item => item.effect === 'defense')
        .reduce((sum, item) => sum + item.value, 0));
      
      const newDefense = Math.max(prevPlayer.defense + totalDefensePower, 0);
      
      return {
        ...prevPlayer,
        defense: Math.min(newDefense, prevPlayer.defenseMax),
      };
    });
  };

  const handlePlayerHeal = () => {
    setPlayer((prevPlayer) => {
      const healAmount = Math.min(prevPlayer.healthPower + (prevPlayer.inventory
        .filter(item => item.effect === 'health')
        .reduce((sum, item) => sum + item.value, 0)), prevPlayer.healthMax);
      
      return {
        ...prevPlayer,
        health: Math.min(prevPlayer.health + healAmount, prevPlayer.healthMax),
      };
    });
  };

  return {
    handlePlayerAttack,
    handlePlayerDefense,
    handlePlayerHeal,
  };
};

export default PlayerActionHandler;
