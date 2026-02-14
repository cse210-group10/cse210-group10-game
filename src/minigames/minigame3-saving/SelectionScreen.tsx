import React, { useState } from 'react';
import './styles.css';

// Define what an item looks like - what info we need to show
interface Item {
  id: string;        // unique identifier
  name: string;      // item name (House, Watch, Car)
  description: string; // short description
  icon: string;      // emoji icon to display
  value: number;     // cost of the item
}

// The three items students can choose from
const availableItems: Item[] = [
  {
    id: 'house',
    name: 'House',
    description: 'A comfortable home to live in',
    icon: '🏠',
    value: 250000
  },
  {
    id: 'watch',
    name: 'Watch',
    description: 'A luxury timepiece',
    icon: '⌚',
    value: 5000
  },
  {
    id: 'car',
    name: 'Car',
    description: 'A reliable vehicle',
    icon: '🚗',
    value: 30000
  }
];

// Props passed to this component - what parent component tells us to do
interface SelectionScreenProps {
  onSelection: (item: Item) => void; // function to call when item is selected
}

const SelectionScreen: React.FC<SelectionScreenProps> = ({ onSelection }) => {
  // State to track which item is currently selected
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // When user clicks on an item, save it as selected
  const handleItemSelect = (item: Item) => {
    setSelectedItem(item);
  };

  // When user clicks continue, tell parent component which item was chosen
  const handleContinue = () => {
    if (selectedItem) {
      onSelection(selectedItem);
    }
  };

  return (
    <div className="selection-screen">
      <h1 className="selection-title">Choose Your Goal</h1>
      <p className="selection-subtitle">Select one item to save for</p>
      
      {/* Grid layout showing all 3 items */}
      <div className="items-grid">
        {availableItems.map((item) => (
          <button
            key={item.id}
            // Add 'selected' class if this item is currently selected
            className={`item-card ${selectedItem?.id === item.id ? 'selected' : ''}`}
            onClick={() => handleItemSelect(item)}
            // Disable other buttons once one is selected (only allow 1 selection)
            disabled={selectedItem !== null && selectedItem.id !== item.id}
          >
            <div className="item-icon">{item.icon}</div>
            <div className="item-name">{item.name}</div>
            <div className="item-description">{item.description}</div>
            <div className="item-value">${item.value.toLocaleString()}</div>
          </button>
        ))}
      </div>

      {/* Show selected item and continue button */}
      {selectedItem && (
        <div className="continue-section">
          <p className="selected-text">
            You selected: <strong>{selectedItem.name}</strong>
          </p>
          <button 
            className="continue-button"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectionScreen;
