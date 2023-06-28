import React from 'react';

function Loading() {
  return (
    <div className="loading">
      <div className="loading__spinner"></div>
      <p className="loading__text">Загрузка...</p>
    </div>
  );
}

export default Loading;
