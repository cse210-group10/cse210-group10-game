import React from 'react';
import type { PopupProps } from '../types/General';
import './styles.css';

const Popup: React.FC<PopupProps> = ({
   title,
   content,
   onClose,
}) => {

  return (
    <div className="popup-container">
      <div className="popup">
         <h1 className="popup-title">{title}</h1>
         <p className="popup-content">{content}</p>
         <button
         className="close-button"
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