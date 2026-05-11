import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import InputPage from './pages/InputPage';
import NightmarePage from './pages/NightmarePage';
import HistoryPage from './pages/HistoryPage';
import VHSOverlay from './components/VHSOverlay';
import TerminalLog from './components/TerminalLog';
import FractalBackground from './effects/FractalBackground';
import ShadowWatcher from './effects/ShadowWatcher';
import MouseStalker from './effects/MouseStalker';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-horror-black">
        {/* Persistent Effects */}
        <FractalBackground />
        <ShadowWatcher />
        <MouseStalker />
        <VHSOverlay />
        <TerminalLog />
        
        {/* Application Routes */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/input" element={<InputPage />} />
            <Route path="/nightmare" element={<NightmarePage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
