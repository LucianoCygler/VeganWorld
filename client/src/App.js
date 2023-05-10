import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
// import { useEffect, useState } from 'react';
import { HomePage, LandingPage, Detail, Cart } from "./Views/index";
import { NavBar } from "./Components/index";


function App() {

  //************************************* OCULTAR / MOSTRAR NAVBAR *********************************/
  const location = useLocation();
  const showNav = location.pathname !== "/";

  return (
    <div className="App">
      {showNav && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </div>
  );
}
export default App;