import React, { useState } from 'react';
import Welcome from '../components/Welcome';
import HeroSelection from '../components/HeroSelection';
import RouteSelection from '../components/RouteSelection';
import Game from '../components/Game';
import Victory from '../components/Victory';
import Defeat from '../components/Defeat';

function App() {
  const [stage, setStage] = useState('welcome');
  const [selectedHero, setSelectedHero] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleStartGame = () => setStage('hero-selection');
  const handleHeroSelect = (hero) => {
    setSelectedHero(hero);
    setStage('route-selection');
  };
  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    setStage('game');
  };

  const handleVictory = () => setStage('victory');
  const handleDefeat = () => setStage('defeat');
  const handleRestart = () => {
    setSelectedHero(null);
    setSelectedRoute(null);
    setStage('welcome');
  };

  return (
    <div className="App">
      {stage === 'welcome' && <Welcome onStart={handleStartGame} />}
      {stage === 'hero-selection' && <HeroSelection onHeroSelect={handleHeroSelect} />}
      {stage === 'route-selection' && <RouteSelection onRouteSelect={handleRouteSelect} />}
      {stage === 'game' && (
        <Game
          hero={selectedHero}
          route={selectedRoute}
          onVictory={handleVictory}
          onDefeat={handleDefeat}
        />
      )}
      {stage === 'victory' && <Victory onRestart={handleRestart} />}
      {stage === 'defeat' && <Defeat onRestart={handleRestart} />}
    </div>
  );
}

export default App;
