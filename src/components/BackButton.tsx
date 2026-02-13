import { useNavigate } from "react-router-dom";
import './styles.css';

export const BackButton = () => {
  const navigate = useNavigate()

  const handleBackToMap = () => {
      console.log("Back Button Pressed")
      navigate('/map');
  };

  return (
    <button className="back-button" onClick={handleBackToMap}>
   ←
   </button>
  )
}