import React from 'react';
import './styles.css';

// Same Item interface as SelectionScreen - defines item structure
interface Item {
  id: string;
  name: string;
  description: string;
  icon: string;
  value: number;
}

// Props for this component - what parent component tells us to do
interface ConfirmationScreenProps {
  selectedItem: Item;           // the item the user selected
  onBackToSelection: () => void; // function to go back to selection screen
  onContinue: () => void;       // function to continue to next step
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ 
  selectedItem, 
  onBackToSelection, 
  onContinue 
}) => {
  return (
    <div className="confirmation-screen">
      <h1 className="confirmation-title">Goal Selected!</h1>
      
      {/* Show the selected item with big styling */}
      <div className="selected-item-card">
        <div className="item-icon-large">{selectedItem.icon}</div>
        <div className="item-details">
          <h2 className="item-name">{selectedItem.name}</h2>
          <p className="item-description">{selectedItem.description}</p>
          <div className="item-value-large">
            Target Amount: ${selectedItem.value.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Two buttons: back to selection or continue */}
      <div className="confirmation-actions">
        <button 
          className="back-button"
          onClick={onBackToSelection}
        >
          ← Back to Selection
        </button>
        <button 
          className="continue-button"
          onClick={onContinue}
        >
          Continue to Saving Challenge
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
