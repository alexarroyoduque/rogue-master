import React, { useState } from 'react';
import Battle from './Battle';
import Shop from './Shop';
import MisteryZone from './MisteryZone';
import AdvanceScreen from './AdvanceScreen';

const Game = ({ hero, route, onVictory, onDefeat }) => {
  const [player, setPlayer] = useState({ ...hero });
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showAdvanceScreen, setShowAdvanceScreen] = useState(false);
  const [goldReward, setGoldReward] = useState(0); // Para pasar el oro obtenido a AdvanceScreen

  const handleNextStep = () => {
    setShowAdvanceScreen(false);
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < route.length) {
      setCurrentStepIndex(nextIndex);
    } else {
      onVictory();
    }
  };

  const handleBattleEnd = (playerWon, gold) => {
    if (playerWon) {
      setGoldReward(gold); // Guarda el oro obtenido para pasarlo a AdvanceScreen
      setShowAdvanceScreen(true); // El jugador ganó la batalla, avanza
    } else {
      onDefeat(); // El jugador perdió
    }
  };

  const handleExitShop = () => {
    setShowAdvanceScreen(false); // Sale de la tienda y pasa a la siguiente batalla
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < route.length) {
      setCurrentStepIndex(nextIndex); // Actualiza el índice para ir a la siguiente batalla
    }
  };

  const handleExitMisteryZone = () => {
    setShowAdvanceScreen(false); // Sale de la MisteryZone y pasa al siguiente paso
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < route.length) {
      setCurrentStepIndex(nextIndex); // Actualiza el índice para ir a la siguiente batalla
    }
  };

  const currentStep = route[currentStepIndex];
  const location = currentStep.location;

  // Renderiza la batalla, tienda o MisteryZone dependiendo del paso en la ruta
  if (showAdvanceScreen) {
    return (
      <AdvanceScreen 
        onNext={handleNextStep} 
        goldReward={goldReward} 
        playerGold={player.gold} 
      />
    );
  }

  return (
    <div>
      {location === 'shop' ? (
        <Shop player={player} setPlayer={setPlayer} onExitShop={handleExitShop} />
      ) : location === 'question' ? (
        <MisteryZone player={player} setPlayer={setPlayer} onExitMisteryZone={handleExitMisteryZone} />
      ) : (
        <Battle 
          player={player} 
          setPlayer={setPlayer} 
          onBattleEnd={handleBattleEnd} 
          currentRoute={currentStep} // Pasa la ruta actual a Battle
        />
      )}
    </div>
  );
};

export default Game;
