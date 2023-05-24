import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Product.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createFavoriteAction,
  deleteFavoriteAction,
  getClientAllFavorites,
} from "../../../redux/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import "aos/dist/aos.css";

function Product({ nombre, imagen, precio, stock, descripcion, id }) {
  const [isFav, setIsFav] = useState(false);
  const [showInfo, setShowInfo] = useState(false); /* INFO */
  // const product = { nombre, imagen, precio, stock, descripcion, id };
  const { user, favorites } = useSelector((state) => state);
  const dispatch = useDispatch();
  const product_id = id;
  const client_id = user.id;
  const email = localStorage.getItem("email");

  useEffect(() => {
    for (const item of favorites) {
      if (id == item.Product.id) setIsFav(true);
    }
  }, []);

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
  };

  return (
    <div
      className={styles.mainContainer}
      onMouseOver={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      {email ? (
        <div>
          {" "}
          {!isFav ? (
            <div className={styles.favoriteContainer}>
              <FontAwesomeIcon
                className={styles.favButton}
                onClick={handleFavorite}
                icon={farHeart}
              />
            </div>
          ) : (
            <div className={styles.favoriteContainer}>
              <FontAwesomeIcon
                className={styles.favButton}
                onClick={handleFavorite}
                icon={fasHeart}
              />
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
            <div className={styles.divImage}>
              <img className={styles.image} src={imagen} alt={nombre} />
            </div>
            <hr />
            <h2 className={styles.subtitle}>{nombre}</h2>
            {/* <h2 className={styles.subtitle}>{product.descripcion}</h2> */}
            {showInfo && (
              <div className={styles.priceContainer}>
                <h2 className={styles.price}>${precio} </h2>
              </div>
            )}
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default Product;
