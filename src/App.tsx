import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import MapPage from './pages/MapPage';
import MinigamePage from './pages/MinigamePage';
import ScholarshipCharacter from './minigames/minigame1-scholarship/character';
import { StarsProvider } from './pages/MapPage/Stars';
import { CoinsProvider } from './pages/MapPage/Coins';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <StarsProvider>
      <CoinsProvider>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/minigame/:levelId" element={<MinigamePage />} />

        {/* Page after clicking start for Scholarship mini game */}
        <Route path="/minigame/level-1/character" element={<ScholarshipCharacter />} />
        
      </Routes>
      </CoinsProvider>
      </StarsProvider>
    </BrowserRouter>
  );
}

export default App;
