import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import styles from "./NavBar.module.css";

function NavBar() {
    return (
        <div className={styles.mainDiv}>
            <nav className={styles.navbar}>
                <SearchBar />
            </nav>
        </div>
    )
}

export default NavBar