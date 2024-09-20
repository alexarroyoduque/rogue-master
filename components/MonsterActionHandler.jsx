const MonsterActionHandler = ({ player, monster, setPlayer, setMonster, timeline }) => {
  const handleMonsterAction = () => {
    if (monster.health <= 0) {
      return; // No ejecutar la acción si el monstruo está derrotado
    }
    console.log('MonsterActionHandler');
    
    const currentMonsterAction = timeline[0]; // Asegúrate de que timeline esté disponible
    console.log('Current Monster Action:', currentMonsterAction);

    if (currentMonsterAction.action === 'attack') {
      setPlayer((prevPlayer) => {
        let newDefense = prevPlayer.defense;
        let newHealth = prevPlayer.health;
        const damageToDefense = Math.min(prevPlayer.defense, currentMonsterAction.value);

        newDefense -= damageToDefense;

        if (newDefense <= 0) {
          const remainingDamage = currentMonsterAction.value - damageToDefense;
          newHealth = Math.max(prevPlayer.health - remainingDamage, 0);
        }

        return {
          ...prevPlayer,
          defense: newDefense,
          health: newHealth,
        };
      });
    } else if (currentMonsterAction.action === 'defense') {
      setMonster((prevMonster) => {
        // Se asegura de que el valor de defensa esté dentro del rango y no supere el máximo
        const defenseIncrease = Math.floor(Math.random() * (monster.defenseRange[1] - monster.defenseRange[0] + 1)) + monster.defenseRange[0];
        const newDefense = Math.min(prevMonster.defense + defenseIncrease, prevMonster.defenseMax);

        return {
          ...prevMonster,
          defense: newDefense,
        };
      });
    } else if (currentMonsterAction.action === 'health') {
      setMonster((prevMonster) => {
        // Genera una cantidad de curación dentro del rango especificado y asegura que no supere el máximo de salud
        const healAmount = Math.floor(Math.random() * (monster.healthRange[1] - monster.healthRange[0] + 1)) + monster.healthRange[0];
        const newHealth = Math.min(prevMonster.health + healAmount, prevMonster.healthMax);

        return {
          ...prevMonster,
          health: newHealth,
        };
      });
    }

  };

  return {
    handleMonsterAction,
  };
};

export default MonsterActionHandler;
