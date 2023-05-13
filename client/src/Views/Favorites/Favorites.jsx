import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getClientFavorites } from "../../redux/actions/actions";
import styles from "./Favorites.module.css";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.id) {
      const client_id = user.id;
      dispatch(getClientFavorites(client_id));
    }
  }, [user, dispatch]);

  if (!favorites || favorites.length === 0) {
    return <p>No hay favoritos</p>;
  }

  return (
    <div className={styles.contenedor}>
      {favorites.map((favorite) => (
        <div className={styles.card} key={favorite.id}>
          <p>{favorite.Product.nombre}</p>
          <img src={favorite.Product.imagen} alt={favorite.Product.nombre} />
          <p>{favorite.Product.precio}</p>
          <p>{favorite.Product.descripcion}</p>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
