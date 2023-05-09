import './App.css';
import { Routes, Route } from "react-router-dom";
// import { useEffect, useState } from 'react';
// import axios from "axios";
import LandingPage from "./Views/LandingPage/LandingPage";
import HomePage from './Views/HomePage/HomePage';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
