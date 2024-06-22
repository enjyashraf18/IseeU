import React from 'react';
import './Loading.css'; // Import the CSS file for styling

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading ICU data, please wait...</p>
    </div>
  );
};

export default Loading;
