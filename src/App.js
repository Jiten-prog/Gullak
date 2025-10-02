import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FridoHero from './FridoHero'; // Adjust path if needed
import Login from './components/Login'; // Adjust path if needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FridoHero />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
