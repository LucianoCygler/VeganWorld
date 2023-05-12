import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterNameProduct } from "../../../redux/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchBar.module.css";

function SearchBar() {
    const [isSearching, setIsSearching] = useState(false);
    const dispatch = useDispatch(); 

    const handleSearch = (event) => {
        const inputValue = event.target.value;
        dispatch(filterNameProduct(inputValue));
    }

    return (
        <div className={styles.mainContainer}>
            <nav>
                <input className={`${styles.inputClass} ${isSearching ? styles.show: styles.hidden}`} type="search" placeholder="Search a product..." onChange={handleSearch} onMouseEnter={() => setIsSearching(true)} onMouseLeave={() => setIsSearching(false)} />
                <FontAwesomeIcon icon={faMagnifyingGlass} onMouseEnter={() => setIsSearching(true)} onMouseLeave={() => setIsSearching(false)} />
            </nav>
        </div>
    )
}

export default SearchBar;