import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Product.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createFavorite } from "../../../redux/actions/actions";

function Product({ nombre, imagen, precio, stock, descripcion, id }) {
  const [isFav, setIsFav] = useState(false);
  const product = { nombre, imagen, precio, stock, descripcion, id };
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const product_id = id;
  const client_id = user.id;
  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
    } else {
      setIsFav(true);
      dispatch(createFavorite(product_id, client_id));
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div>
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
        <div>
          {" "}
          <NavLink
            className={styles.card}
            to={`/Detail/${product.id}`}
            style={{ textDecoration: "none" }}
          >
            <h2 className={styles.subtitle}>{product.nombre}</h2>
            <img
              className={styles.image}
              src={product.imagen}
              alt={product.nombre}
            />

            <h2 className={styles.subtitle}>${product.precio} </h2>
            <h2 className={styles.subtitle}>{product.descripcion}</h2>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Product;
