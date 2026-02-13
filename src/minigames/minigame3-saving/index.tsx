import React, { useState } from 'react';
import type { MinigameProps } from '../../types/Minigame';
import SelectionScreen from './SelectionScreen';
import ConfirmationScreen from './ConfirmationScreen';
import './styles.css';

// Metadata for this minigame - shows up in the level selection
export const metadata = {
  title: "Savings Challenge",
  description: "Choose your savings goal and start saving",
  id: "level-3"
};

// Define what an item looks like - same as in SelectionScreen
interface Item {
  id: string;
  name: string;
  description: string;
  icon: string;
  value: number;
}

// Main minigame component - manages the flow between screens
const Minigame3: React.FC<MinigameProps> = ({ onComplete }) => {
  // State to track which screen to show (selection or confirmation)
  const [screen, setScreen] = useState<'selection' | 'confirmation'>('selection');
  
  // State to track which item was selected
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // When user selects an item, save it and go to confirmation screen
  const handleSelection = (item: Item) => {
    setSelectedItem(item);
    setScreen('confirmation');
  };

  // When user clicks back, go to selection screen and clear selection
  const handleBackToSelection = () => {
    setScreen('selection');
    setSelectedItem(null);
  };

  // When user clicks continue, complete the minigame with 3 stars
  const handleContinue = () => {
    // For now, complete with 3 stars
    // In the future, this could lead to an actual saving challenge
    onComplete({ stars: 3 });
  };

  return (
    <div className="minigame-level3-container">
      {/* Show selection screen if screen state is 'selection' */}
      {screen === 'selection' && (
        <SelectionScreen onSelection={handleSelection} />
      )}
      
      {/* Show confirmation screen if screen state is 'confirmation' and we have a selected item */}
      {screen === 'confirmation' && selectedItem && (
        <ConfirmationScreen
          selectedItem={selectedItem}
          onBackToSelection={handleBackToSelection}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
};

export default Minigame3;
