import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import MapPage from './pages/MapPage';
import MinigamePage from './pages/MinigamePage';
import './App.css';
// This is nessary for vite/node.js since this is the genearl entry point for the backend to compile the game and frontend to display it
//  without it it would return error, so don't delete
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/minigame/:levelId" element={<MinigamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
