import React from 'react';
import './TurnTimeline.css'; // Asegúrate de importar el archivo CSS

const TurnTimeline = ({ timeline }) => {
  return (
    <div className="timeline">
      {timeline.map((turn, index) => (
        <div key={index} className="timeline-turn" dangerouslySetInnerHTML={{ __html: turn.visual }} />
      ))}
    </div>
  );
};

export default TurnTimeline;
