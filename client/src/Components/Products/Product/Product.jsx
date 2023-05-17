import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Product.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createFavoriteAction,
  deleteFavoriteAction,
} from "../../../redux/actions/actions";

function Product({ nombre, imagen, precio, stock, descripcion, id }) {
  const [isFav, setIsFav] = useState(false);
  // const product = { nombre, imagen, precio, stock, descripcion, id };
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const product_id = id;
  const client_id = user.id;

  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
      if (product_id) {
        dispatch(deleteFavoriteAction(product_id));
      } else {
        console.error("error");
      }
    } else {
      setIsFav(true);
      if (client_id) {
        dispatch(createFavoriteAction({ client_id, product_id }));
      } else {
        console.error("Invalid client ID");
      }
    }

    // Guardar o eliminar el favorito en el almacenamiento local
    const storedFavorites = localStorage.getItem("favorites");
    let updatedFavorites = [];
    if (storedFavorites) {
      updatedFavorites = JSON.parse(storedFavorites);
    }
    if (isFav) {
      updatedFavorites = updatedFavorites.filter(
        (favId) => favId !== product_id
      );
    } else {
      updatedFavorites.push(product_id);
    }
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    /* Animacion boton */

    //   const favButton = document.querySelector(`.${styles.favButton}`);
    //   favButton.classList.add(styles.animate);
    //   setTimeout(() => {
    //     favButton.classList.remove(styles.animate);
    //   }, 500);
  };

  useEffect(() => {
    // Cargar los favoritos desde el almacenamiento local al inicializar el componente
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      setIsFav(parsedFavorites.includes(product_id));
    }
  }, []);

  return (
    <div className={styles.mainContainer}>
      {localStorage.getItem("email") ? (
        <div>
          {" "}
          {isFav ? (
            <div className={styles.favoriteContainer}>
              <button className={styles.favButton} onClick={handleFavorite}>
                ❤️
              </button>
            </div>
          ) : (
            <div className={styles.favoriteContainer}>
              <button className={styles.favButton} onClick={handleFavorite}>
                🤍
              </button>
            </div>
          )}
        </div>
      ) : (
        ""
      )}

      <NavLink
        className={styles.card}
        to={`/Detail/${id}`}
        style={{ textDecoration: "none" }}

      >
        <div>
          <div>
            {" "}
            <h2 className={styles.subtitle}>{nombre}</h2>
            <img className={styles.image} src={imagen} alt={nombre} />
            <h2 className={styles.subtitle}>${precio} </h2>
            {/* <h2 className={styles.subtitle}>{product.descripcion}</h2> */}
          </div>

        </div>
      </NavLink>
    </div>
  );
}

export default Product;
