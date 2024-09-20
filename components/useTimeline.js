import { useState, useCallback } from 'react';

// Genera una acción del monstruo aleatoriamente
const getRandomMonsterAction = (monster) => {
  const actionType = monster.actions[Math.floor(Math.random() * monster.actions.length)];
  const value = actionType === 'attack'
    ? Math.floor(Math.random() * (monster.attack[1] - monster.attack[0] + 1)) + monster.attack[0]
    : Math.floor(Math.random() * (monster.defenseRange[1] - monster.defenseRange[0] + 1)) + monster.defenseRange[0];

  let visual;

  if (actionType === 'attack') {
    visual = `(<i class="icon-monster"></i><i class="icon-sword"></i>${value})`;
  } else if (actionType === 'defense') {
    visual = `(<i class="icon-monster"></i><i class="icon-shield-plus"></i>${value})`;
  } else if (actionType === 'health') {
    visual = `(<i class="icon-monster"></i><i class="icon-heart"></i>${value})`;
  }

  return {
    visual,
    action: actionType,
    value,
  };
};

const useTimeline = (player, monster) => {
  const [timeline, setTimeline] = useState([]);

  // Genera la línea de tiempo inicial
  const generateInitialTimeline = useCallback(() => {
    console.log('generateInitialTimeline');
    const playerTurnCount = monster.turns * 3; // Número de turnos del jugador que deseas mostrar
    const totalActions = playerTurnCount + Math.ceil(playerTurnCount / monster.turns);

    const initialTimeline = [];
    for (let i = 0; i < totalActions; i++) {
      if ((i + 1) % (monster.turns + 1) === 0) {
        initialTimeline.push(getRandomMonsterAction(monster)); // Acción del monstruo
      } else {
        initialTimeline.push({
          visual: `<i class="icon-${player.name}"></i>`,
          action: 'player',
          value: 0,
        }); // Acción del jugador
      }
    }

    setTimeline(initialTimeline);
  }, [monster]);

  // Actualiza la línea de tiempo después de una acción
  const updateTimeline = useCallback((isMonsterAction) => {
    setTimeline((prevTimeline) => {
      // Elimina el primer elemento para avanzar el turno
      const updatedTimeline = prevTimeline.slice(1);

      // Define la siguiente acción basada en el turno actual
      const nextAction = isMonsterAction
        ? getRandomMonsterAction(monster) // Acción del monstruo
        : {
            visual: `<i class="icon-${player.name}"></i>`,
            action: 'player',
            value: 0,
          }; // Acción del jugador

      // Añade la siguiente acción al final de la línea de tiempo
      return [...updatedTimeline, nextAction];
    });
  }, [monster]);

  // Función para obtener la vista actual de la línea de tiempo
  const getCurrentView = useCallback(() => {
    return timeline.slice(0, 12); // Mostrar solo los primeros 12 turnos
  }, [timeline]);

  return { timeline, generateInitialTimeline, updateTimeline, getCurrentView };
};

export default useTimeline;
