import React, { useState, useEffect } from 'react';
import Player from './Player';
import Monster from './Monster';
import TurnTimeline from './TurnTimeline';
import PlayerActionHandler from './PlayerActionHandler';
import MonsterActionHandler from './MonsterActionHandler';
import GridCell from './GridCell';
import useTimeline from './useTimeline';
import monsters from './monsters';
import './Battle.css'; // Asegúrate de tener los estilos necesarios

const generateMonster = (currentRoute) => {
  let { type, level } = currentRoute;
  const filteredMonsters = monsters.filter(monster =>
    monster.type === type && monster.level === level
  );
  const randomIndex = Math.floor(Math.random() * filteredMonsters.length);
  return filteredMonsters[randomIndex];
};

const Battle = ({ player, setPlayer, onBattleEnd, currentRoute }) => {
  const [monster, setMonster] = useState(generateMonster(currentRoute));
  const [isMonsterTurn, setIsMonsterTurn] = useState(false);
  const [cells, setCells] = useState([]); // Estado para el grid
  const [selectedCells, setSelectedCells] = useState([]); // Estado para las celdas seleccionadas (múltiples)

  const { timeline, generateInitialTimeline, updateTimeline, getCurrentView } = useTimeline(player, monster);

  const { handlePlayerAttack, handlePlayerDefense, handlePlayerHeal } = PlayerActionHandler({
    player,
    monster,
    setMonster,
    setPlayer,
    updateTimeline,
  });

  const { handleMonsterAction } = MonsterActionHandler({
    player,
    monster,
    setPlayer,
    setMonster,
    timeline,
    updateTimeline,
  });

  const calculateFinalPower = (basePower, effectType) => {
    const totalPower = basePower + player.inventory
      .filter(item => item.effect === effectType)
      .reduce((sum, item) => sum + item.value, 0);
    if (effectType === 'defense') {
      return Math.max(totalPower, 0);
    }
    return totalPower;
  };

  const generateInitialGrid = (actions, gridSize) => {
    let grid = [];
    for (let i = 0; i < gridSize; i++) {
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      grid.push(randomAction);
    }
    return grid;
  };

  const updateGridWithRandomActions = () => {
    const newGrid = generateInitialGrid(player.actions, player.grid);
    setCells(newGrid);
  };

  useEffect(() => {
    const initialCells = generateInitialGrid(player.actions, player.grid);
    setCells(initialCells);
  }, [player.actions, player.grid]);

  useEffect(() => {
    generateInitialTimeline();
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      defense: 0,
    }));
  }, []); // Solo se ejecuta cuando el componente se monta
  

  useEffect(() => {
    console.log('timeline');
    console.log(timeline);
    if (timeline.length > 0) {
      const currentTurn = timeline[0];
      console.log('currentTurn')
      console.log(currentTurn)
      setIsMonsterTurn(currentTurn.action !== 'player');
    }
  }, [timeline]);

  const handleMonsterActionClick = () => {
    if (isMonsterTurn) {
      handleMonsterAction();
      updateTimeline(true);
      updateGridWithRandomActions(); // Cambia las casillas después del turno del monstruo
    }
  };

  const handlePlayerActionClick = () => {
    if (selectedCells.length === player.gridSelection && !isMonsterTurn) {
      selectedCells.forEach(index => {
        const selectedAction = cells[index];
        if (selectedAction === 'attack') handlePlayerAttack();
        else if (selectedAction === 'defense') handlePlayerDefense();
        else if (selectedAction === 'health') handlePlayerHeal();
      });

      updateTimeline(false); // Avanza la línea de tiempo con una acción del jugador

      updateGridWithRandomActions(); // Cambia las casillas después del turno del jugador
      setSelectedCells([]); // Deselecciona todas las celdas después de la acción
    }
  };

  useEffect(() => {
    if (monster.health <= 0) {
      const gold = Math.floor(Math.random() * (monster.gold[1] - monster.gold[0] + 1)) + monster.gold[0];
      setPlayer(prevPlayer => ({
        ...prevPlayer,
        gold: prevPlayer.gold + gold
      }));
      onBattleEnd(true, gold);
    } else if (player.health <= 0) {
      onBattleEnd(false);
    }
  }, [monster.health, player.health, onBattleEnd, setPlayer]);

  const handleCellClick = (index) => {
    if (selectedCells.includes(index)) {
      setSelectedCells(selectedCells.filter(i => i !== index));
    } else if (selectedCells.length < player.gridSelection) {
      setSelectedCells([...selectedCells, index]);
    }
  };

  const finalAttackPower = calculateFinalPower(player.attack, 'attack');
  const finalDefensePower = calculateFinalPower(player.defensePower, 'defense');
  const finalHealthPower = calculateFinalPower(player.healthPower, 'health');

  const canPlayerAct = selectedCells.length === player.gridSelection;

  return (
    <div className="battle-container">
      <h2>VS</h2>
      <div className="player-monster-row">
        <div className="player-container">
          <Player player={player} />
        </div>
        <div className="monster-container">
          <Monster monster={monster} />
        </div>
      </div>
      <TurnTimeline timeline={getCurrentView()} />
      <div className="turn-indicator">
        {isMonsterTurn ?
        <p>Monster turn</p> :
        <><p><i className={`icon-${player.name}`}></i> Select {player.gridSelection} actions</p>
          </>
        }
        <button
          className="player-action selectable"
          onClick={handlePlayerActionClick}
          disabled={!canPlayerAct || isMonsterTurn}
        >
          <i className={`icon-${player.name}`}></i>
        </button>
        <button className='monster-action selectable' onClick={handleMonsterActionClick} disabled={!isMonsterTurn}>
          <i className={`icon-monster`}></i>
        </button>
      </div>

      <div className={`grid ${isMonsterTurn ? 'disabled' : ''}`}>
        {cells.map((type, index) => (
          <GridCell
            key={index}
            type={type}
            onClick={() => handleCellClick(index)}
            attackPower={finalAttackPower}
            defensePower={finalDefensePower}
            healthPower={finalHealthPower}
            isSelected={selectedCells.includes(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Battle;
