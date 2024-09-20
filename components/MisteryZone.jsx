import React, { useState, useEffect } from 'react';

const MisteryZone = ({ player, setPlayer, onExitMisteryZone }) => {
  const [posibleZones, setPosibleZones] = useState([
    {
      name: 'manantial',
      effect: 'health',
      effectIcon: 'heart',
      value: 5,
      description: 'Te das un baño y te revitalizas'
    },
    {
      name: 'wolfs',
      effect: 'health',
      effectIcon: 'heart',
      value: -3,
      description: 'Huyes de una manada de lobos'
    },
  ]);

  // Estado para almacenar la zona seleccionada
  const [selectedZone, setSelectedZone] = useState(null);

  const handleZoneEffect = () => {
    // Selecciona una zona aleatoria
    const randomZoneIndex = Math.floor(Math.random() * posibleZones.length);
    const zone = posibleZones[randomZoneIndex];


    // Aplica el efecto de la zona al jugador
    setPlayer((prevPlayer) => {
      const healthNew = Math.max(prevPlayer.health + zone.value, 1); // Evita que la salud baje de 1

      return {
        ...prevPlayer,
        health: healthNew > prevPlayer.healthMax ? prevPlayer.healthMax : healthNew
      };
    });

    // Guarda la zona seleccionada en el estado
    setSelectedZone(zone);
  };

  useEffect(() => {
    handleZoneEffect();
  }, []); // Este efecto se ejecuta solo una vez al montar el componente

  return (
    <div>
      <h1><i className='icon-question'></i></h1>
      
      {selectedZone && (
        <>
          <p>{selectedZone.description}</p>
          <h3>
            <i className={`icon-${selectedZone.effectIcon}`}></i> {selectedZone.value}
          </h3>
          <p>
            <i className={`icon-${player.name}`}></i> 
            <i className={`icon-${selectedZone.effectIcon}`}></i> = {player.health}
          </p>
        </>
      )}
      
      <button className="selectable" onClick={onExitMisteryZone}>➤➤</button>
    </div>
  );
};

export default MisteryZone;
