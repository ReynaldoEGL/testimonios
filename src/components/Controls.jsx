import React from 'react'

export default function Controls({ onPrev, onNext, onRandom }) {
  return (
    <div className="controls" role="group" aria-label="Controles de testimonios">
      <button className="btn control-btn" onClick={onPrev} aria-label="Anterior" title="Anterior">
        ◀
      </button>
      <button className="btn control-btn" onClick={onNext} aria-label="Siguiente" title="Siguiente">
        ▶
      </button>
      <button className="btn control-btn" onClick={onRandom} aria-label="Aleatorio" title="Aleatorio">
        🎲
      </button>
    </div>
  );
}
