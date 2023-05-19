import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./NavBar.module.css";
import { logoutUser } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import PopUpLogin from "../../Views/Login/PopUpLogin";
import { useLocation } from "react-router-dom";

function NavBar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const handleLogout = () => {
    localStorage.removeItem("email");
  };
  const location = useLocation();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.divLeft}>
        <NavLink to="/" className={styles.link}>
          <h1 className={styles.tittle}>VeganWorld!</h1>
        </NavLink>
      </div>
      <div className={styles.divMid}>
        {location.pathname === "/Catalog" ? <SearchBar /> : ""}
      </div>
      <div className={styles.divRight}>
        <Link to="/OurProducts">Our Products</Link>{" "}
        <div className={styles.redirects}>
          <div className={styles.dropdown}>
            <FontAwesomeIcon className={styles.dropbtn} icon={faBars}/>
            <div className={styles.dropdownContent}>
              <div className={styles.triangle}></div>
              <Link to="/MyProfile">Profile</Link>{" "}
              <Link to="/Favorites">Favorites</Link>{" "}
              <Link to="/MyOrders">Orders</Link>{" "}
              <Link to="/MyReviews">Reviews</Link>{" "}
              <Link to="/ContactUs">Contact</Link>
              <Link to="/About">About</Link>{" "}
            </div>
          </div>
        </div>
        <NavLink to="/Cart" className={styles.link}>
          <FontAwesomeIcon
            icon={faCartShopping}
            className={styles.fontAwesome}
          />
        </NavLink>
        {localStorage.getItem("email") ? "" : <PopUpLogin />}
        <NavLink to="/" className={styles.link}>
          <FontAwesomeIcon
            onClick={handleLogout}
            icon={faRightFromBracket}
            className={styles.fontAwesome}
          />
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
