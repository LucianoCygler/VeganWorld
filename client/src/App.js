import './App.css';
import { Routes, Route } from "react-router-dom";
// import { useEffect, useState } from 'react';
import { HomePage, LandingPage, Detail, Cart } from "./Views/index";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/Detail" element={<Detail />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
