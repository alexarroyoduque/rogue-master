import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ icon, value, max, label }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="progress-bar-container">
      <i className={`icon-${icon}`}></i>
      <div className="progress-bar">
        <div className="bar">
          <div
            className="fill"
            style={{ width: `${percentage}%` }}
          ></div>
          <span className="values">
            {value}/{max}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
