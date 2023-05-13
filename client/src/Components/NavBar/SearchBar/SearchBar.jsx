import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterNameProduct,
  getAllProducts,
  getProductByName,
  setProductSearch,
} from "../../../redux/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchBar.module.css";

function SearchBar() {
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useDispatch();
  const filteredProducts = useSelector((state) => state.filteredProducts);

  const handleSearch = (event) => {
    const nombre = event.target.value.toLowerCase();

    const searchResult = filteredProducts?.filter((product) => {
      const productNombre = product?.nombre?.toLowerCase();
      let matchIndex = 0; // Índice de coincidencia
      let hasMatched = true; // Indicador de coincidencia
      for (let i = 0; i < nombre.length; i++) {
        const char = nombre[i];
        if (!productNombre.startsWith(char, matchIndex)) {
          hasMatched = false;
          break;
        }
        matchIndex++;
      }
      return hasMatched;
    });

    dispatch(setProductSearch(searchResult));
    // Hacer algo con el array filtrado
  };

  // Resto del código...

  return (
    <div className={styles.mainContainer}>
      <nav>
        <input
          className={`${styles.inputClass} ${
            isSearching ? styles.show : styles.hidden
          }`}
          type="search"
          placeholder="Search a product..."
          onChange={handleSearch}
          onMouseEnter={() => setIsSearching(true)}
          onMouseLeave={() => setIsSearching(false)}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          onMouseEnter={() => setIsSearching(true)}
          onMouseLeave={() => setIsSearching(false)}
        />
      </nav>
    </div>
  );
}

export default SearchBar;
