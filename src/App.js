import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FridoHero from './FridoHero';
import Products from './Products';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FridoHero />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
