import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import MapPage from './pages/MapPage';
import MinigamePage from './pages/MinigamePage';
import { StarsProvider } from './pages/MapPage/Stars';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <StarsProvider>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/minigame/:levelId" element={<MinigamePage />} />
      </Routes>
      </StarsProvider>
    </BrowserRouter>
  );
}

export default App;
