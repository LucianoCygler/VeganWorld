import React, { useEffect, useState } from "react";
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
import { Box, Flex, Grid, GridItem, Img } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Button, IconButton } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase";

function NavBar() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };
  const location = useLocation();
  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, [email]);
  //asd
  return (
    <div className={styles.mainContainer}>
      <div className={styles.divLeft}>
        <NavLink to="/" className={styles.link}>
          <h1 className={styles.tittle}>VeganWorld!</h1>
        </NavLink>
      </div>
      <div className={styles.divMid}>
        {location.pathname === "/OurProducts" ? <SearchBar /> : ""}
      </div>
      <div className={styles.divRight}>
        <Link to="/OurProducts">Our Products</Link>{" "}
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="unstyled"
            _hover={{ bg: "teal.500" }}
            _selected={{ bg: "teal.500" }}
          />
          <MenuList color={"black"} zIndex={9}>
            <MenuItem as={NavLink} to="/MyProfile">
              Profile
            </MenuItem>
            <MenuItem as={NavLink} to="/Favorites">
              Favorites
            </MenuItem>
            <MenuItem as={NavLink} to="/MyOrders">
              Orders
            </MenuItem>
            <MenuItem as={NavLink} to="/MyReviews">
              Reviews
            </MenuItem>
            <MenuItem as={NavLink} to="/ContactUs">
              Contact
            </MenuItem>
            <MenuItem as={NavLink} to="/About">
              About us
            </MenuItem>
          </MenuList>
        </Menu>
        {/* <div className={styles.redirects}>
          <div className={styles.dropdown}>
            <FontAwesomeIcon className={styles.dropbtn} icon={faBars} />

            <div className={styles.dropdownContent}>
              <div className={styles.triangle}></div>
              <Link to="/MyProfile">Profile</Link>
              <Link to="/Favorites">Favorites</Link>
              <Link to="/MyOrders">Orders</Link>
              <Link to="/MyReviews">Reviews</Link>
              <Link to="/ContactUs">Contact</Link>
              <Link to="/About">About</Link>
            </div>
          </div>
        </div> */}
        <NavLink to="/Cart" className={styles.link}>
          <FontAwesomeIcon
            icon={faCartShopping}
            className={styles.fontAwesome}
          />
        </NavLink>
        {email ? "" : <PopUpLogin />}
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
