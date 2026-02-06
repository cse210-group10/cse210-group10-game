import React from 'react';
import './LevelModal.css';

interface LevelModalProps {
  level: {
    title: string;
    description: string;
    id: string;
  };
  onStart: () => void;
  onClose: () => void;
}

const LevelModal: React.FC<LevelModalProps> = ({ level, onStart, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h2 className="modal-title">{level.title}</h2>
        <p className="modal-description">{level.description}</p>
        
        <div className="modal-actions">
          <button className="start-btn" onClick={onStart}>
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelModal;
