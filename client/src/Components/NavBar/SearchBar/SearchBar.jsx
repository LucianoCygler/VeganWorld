import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { filterNameProduct } from "../../../redux/actions/actions";
import styles from "./SearchBar.module.css";

function SearchBar() {
    const dispatch = useDispatch();

    const handleSearch = (event) => {
        const inputValue = event.target.value;
        dispatch(filterNameProduct(inputValue));
    };

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
                <input className={styles.inputClass} type="search" placeholder="Search a product..." onChange={handleSearch} />
                <NavLink to="/" className={styles.buttonClass}>
                    Logout
                </NavLink>
            </div>
        </div>
    )
}

export default SearchBar;