import React from 'react';
import type { PopupProps } from '../types/General';
import './styles.css';

// popup component

// creates a popup with a title, content, and an ok button to close the popup
// forces highest z-index and centers the popup on the screen, only closeable 
// using the ok button (no clicking outside to close)
const Popup: React.FC<PopupProps> = ({
   title,
   content,
   onClose,
}) => {

  return (
    <div className="popup-container" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h1 className="popup-title">{title}</h1>
            <p className="popup-content">{content}</p>
            <button
            className="popup-button"
            onClick={onClose}
            >
            Ok!
            </button>
      </div>
    </div>
  );
};

/*
example usage:
const [showPopup, setShowPopup] = useState(false);

in return(
   <button onClick={() => setShowPopup(true)}>Open</button>

   {showPopup && (
      <Popup
      title="Tutorial"
      content="yada yada tutorial stuff"
      onClose={() => setShowPopup(false)}
      />
   )}
)
*/

export default Popup;