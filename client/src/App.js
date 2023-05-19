import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import {
  HomePage,
  LandingPage,
  Resetpass,
  Detail,
  Cart,
  Favorites,
  MyOrders,
  MyProfile,
  MyReviews,
  ContactUs,
  About,
  Register,
  Login,
} from "./Views/index";
import OurProducts from "./Views/OurProducts/OurProducts";
import { NavBar } from "./Components/index";

function App() {
  //************************************* OCULTAR / MOSTRAR NAVBAR *********************************/
  const location = useLocation();

  const showNav = location.pathname !== "/home";
  const showNav2 = location.pathname !== "/register";

  return (
    <div className="App">
      {showNav && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} /> */}
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/MyOrders" element={<MyOrders />} />
        <Route path="/MyProfile" element={<MyProfile />} />
        <Route path="/MyReviews" element={<MyReviews />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/ResetPass" element={<Resetpass />} />
        <Route path="/About" element={<About />} />
        <Route path="/OurProducts" element={<OurProducts />} />
      </Routes>
    </div>
  );
}
export default App;
