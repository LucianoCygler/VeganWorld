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

    // Verificar si la cadena de búsqueda tiene más de una letra
    if (nombre.length > 1) {
      const searchResult = filteredProducts?.filter((product) => {
        const productNombre = product?.nombre?.toLowerCase();
        return productNombre.includes(nombre);
      });

      dispatch(setProductSearch(searchResult));
      // Hacer algo con el array filtrado
    } else if (nombre.length === 0) {
      dispatch(setProductSearch(filteredProducts)); // Restaurar la lista original de productos
      // Hacer algo cuando la cadena de búsqueda está vacía
    }
  };

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
