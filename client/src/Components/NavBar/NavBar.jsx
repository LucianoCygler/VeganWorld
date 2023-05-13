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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
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
        <h1 className={styles.tittle}>VeganWorld!</h1>
      </div>
      <div className={styles.divRight}>
        <div className={styles.redirects}>
          <Link to="/MyProfile">Profile</Link>{" "}
          <Link to="/Favorites">Favorites</Link>{" "}
          <Link to="/MyOrders">Orders</Link>{" "}
          <Link to="/MyReviews">Reviews</Link>{" "}
          <Link to="/ContactUs">Contact</Link> <Link to="/About">About</Link>{" "}
        </div>

        <SearchBar />
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
