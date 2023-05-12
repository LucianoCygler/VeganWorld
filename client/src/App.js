import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { HomePage, Detail, Cart, Login, Register } from "./Views/index";
import { NavBar } from "./Components/index";

function App() {
  //************************************* OCULTAR / MOSTRAR NAVBAR *********************************/
  const location = useLocation();

  const showNav = location.pathname !== "/login";
  const showNav2 = location.pathname !== "/register";
  return (
    <div className="App">
      {showNav && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </div>
  );
}
export default App;
