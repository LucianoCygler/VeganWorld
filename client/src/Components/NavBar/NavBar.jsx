import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./NavBar.module.css";
import { logoutUser } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import PopUpLogin from "../../Views/Login/PopUpLogin";


function NavBar() {  

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const handleLogout = () => {
    localStorage.setItem("email", "")
  };

  
  return (
    <div className={styles.mainContainer}>
      <div className={styles.divLeft}>
        <NavLink to="/" className={styles.link}>
          <FontAwesomeIcon icon={faHouse} className={styles.fontAwesome} />
        </NavLink>
        <NavLink to="/Cart" className={styles.link}>
          <FontAwesomeIcon
            icon={faCartShopping}
            className={styles.fontAwesome}
          />
        </NavLink>
      </div>
      <div className={styles.divMid}>
        <NavLink to={"/"} className={styles.tittle}>
        <h1 >VeganWorld!</h1>
        </NavLink>
      </div>
      <div className={styles.divRight}>
        <div className={styles.redirects}>
          <div className={styles.dropdown}>
            <span className={styles.dropbtn}>Menu</span>
            <div className={styles.dropdownContent}>
              <Link to="/MyProfile">Profile</Link>{" "}
              <Link to="/Favorites">Favorites</Link>{" "}
              <Link to="/MyOrders">Orders</Link>{" "}
              <Link to="/MyReviews">Reviews</Link>{" "}
              <Link to="/ContactUs">Contact</Link> <Link to="/About">About</Link>{" "}
            </div>
          </div>
        </div>

        <SearchBar />
        {localStorage.getItem("email") ? (
          ""
        ) : (
          <PopUpLogin /> 
        )}
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
