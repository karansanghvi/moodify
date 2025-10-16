import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EmotionResult from './components/EmotionResult';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/result" element={<EmotionResult/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
