import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
// import axios from "axios";
import { HomePage, LandingPage, Detail, Cart } from "./Views/index";
import Navbar from './Components/NavBar/NavBar';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
