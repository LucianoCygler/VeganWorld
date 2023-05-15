import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getClientAllFavorites } from "../../redux/actions/actions";
import styles from "./Favorites.module.css";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    } else {
      const client_id = user?.id;
      dispatch(getClientAllFavorites(client_id));
    }
  }, [dispatch]);

  return (
    <div className={styles.mainContainer}>
      {favorites && favorites.length > 0 ? (
        favorites.map((favorite) => (
          <div className={styles.card} key={favorite.id}>
            {favorite.Product && (
              <>
                <p>{favorite.Product.nombre}</p>
                <img className={styles.image}
                  src={favorite.Product.imagen}
                  alt={favorite.Product.nombre}
                />
                <p>{favorite.Product.precio}</p>
                <p>{favorite.Product.descripcion}</p>
              </>
            )}
          </div>
        ))
      ) : (
        <h1>No hay favoritos</h1>
      )}
    </div>
  );
};

export default Favorites;
