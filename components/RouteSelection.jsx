import React from 'react';
import './RouteSelection.css';

function RouteSelection({ onRouteSelect }) {
  const routes = [
    [
      { location: 'monster', type: 'normal', level: 1 },
      { location: 'shop' },
      { location: 'monster', type: 'normal', level: 1 },
      { location: 'question' },
      { location: 'monster', type: 'normal', level: 1 },
      { location: 'monster', type: 'boss', level: 1 }
    ],
    [
      { location: 'monster', type: 'normal', level: 1 },
      { location: 'monster', type: 'normal', level: 1 },
      { location: 'monster', type: 'normal', level: 1 },
      { location: 'shop' },
      { location: 'monster', type: 'normal', level: 1 },
      { location: 'monster', type: 'boss', level: 1 }
    ],
  ];

  const getIconClass = (location, type) => {
    switch (location) {
      case 'monster':
        return type === 'boss' ? 'icon-boss' : 'icon-monster';
      default:
        return `icon-${location}`;
    }
  };

  return (
    <div className="route-selection-container">
      <h1>Route selection</h1>
      <div className="routes">
        {routes.map((route, index) => (
          <div className="route selectable" key={index} onClick={() => onRouteSelect(route)}>
            {/* Renderizamos las rutas en orden inverso */}
            {route.slice().reverse().map((step, idx) => (
              <div key={idx} className="route-item">
                <span>
                  <i className={getIconClass(step.location, step.type)}></i>
                </span>
                {idx < route.length - 1 && <span className="arrow">▲</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RouteSelection;
