import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./SearchBar.module.css";

function SearchBar() {
    const [ inputValue, setInputValue ] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleSearch = () => {
        setInputValue("");
    }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.divLeft}>
                <NavLink to="/Home" className={styles.link}>
                    Home
                </NavLink>
                <NavLink to="/Cart" className={styles.link}>
                    Cart
                </NavLink>
            </div>
            <div className={styles.divMid}>
                <h1 className={styles.tittle}>
                    VeganWorld!
                </h1>
            </div>
            <div className={styles.divRight}>
                <input className={styles.inputClass} type="search" value={inputValue} placeholder="Search a product..." onChange={handleInputChange} />
                <button className={styles.buttonClass} onClick={handleSearch} >
                    Search
                </button>
                <NavLink to="/" className={styles.buttonClass}>
                    Logout
                </NavLink>
            </div>
        </div>
    )
}

export default SearchBar;