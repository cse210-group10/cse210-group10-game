import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import MapPage from './pages/MapPage';
import MinigamePage from './pages/MinigamePage';
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
      </Routes>
      </CoinsProvider>
      </StarsProvider>
    </BrowserRouter>
  );
}

export default App;
