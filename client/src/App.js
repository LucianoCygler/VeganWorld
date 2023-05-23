import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

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
import Paperbase from "./Views/Template/Dashboard";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" state={{ showLogin: true }} />
  );
};

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/ResetPass" element={<Resetpass />} />
        <Route path="/About" element={<About />} />
        <Route path="/OurProducts" element={<OurProducts />} />
        <Route
          path="/MyOrders"
          element={<ProtectedRoute element={MyOrders} />}
        />

        <Route
          path="/MyProfile"
          element={<ProtectedRoute element={MyProfile} />}
        />
        <Route
          path="/Favorites"
          element={<ProtectedRoute element={Favorites} />}
        />
        <Route
          path="/MyReviews"
          element={<ProtectedRoute element={MyReviews} />}
        />
        <Route path="/dash" element={<Paperbase />} />

      </Routes>
    </div>
  );
}
export default App;
