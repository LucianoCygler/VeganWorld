import React, { useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCartShopping, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import styles from "./NavBar.module.css";

function NavBar() {
    const [showMenu, setShowMenu] = useState(false);

    const handleClick = () => {
        setShowMenu(!showMenu);
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.divLeft}>
                <NavLink to="/" className={styles.link}>
                    <FontAwesomeIcon icon={faHouse} className={styles.fontAwesome} />
                </NavLink>
                <NavLink to="/Cart" className={styles.link}>
                    <FontAwesomeIcon icon={faCartShopping} className={styles.fontAwesome} />
                </NavLink>
            </div>
            <div className={styles.divMid}>
                <h1 className={styles.tittle}>
                    VeganWorld!
                </h1>
            </div>
            <div className={styles.divRight}>
                <SearchBar />
                <div className={`${styles.dropdown} ${showMenu ? styles.show : ""}`}>
                    <button className={styles.dropbtn} onClick={handleClick} >
                        <FontAwesomeIcon icon={faRightFromBracket} className={styles.fontAwesome} />
                    </button>
                    <div className={styles.dropdownContent}>
                        <NavLink to="/MiPerfil" className={styles.link}>
                            Mi perfil
                        </NavLink>
                        <NavLink to="/MiCarrito" className={styles.link}>
                            Mi carrito
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar