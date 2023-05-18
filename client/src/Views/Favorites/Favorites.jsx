import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getClientAllFavorites,
  getUserDataByEmail,
} from "../../redux/actions/actions";
import styles from "./Favorites.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import LoginForm from "../Login/LoginForm";
const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  useEffect(() => {
    const emailCurrent = localStorage.getItem("email");
    if (emailCurrent) {
      dispatch(getUserDataByEmail(emailCurrent));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const client_id = user?.id;
      dispatch(getClientAllFavorites(client_id));
    }
  }, [user]);

  return (
    <div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm handleCloseModal={handleCloseModal}></LoginForm>{" "}
        </Modal.Body>
      </Modal>
      {!user ? (
        <div className={styles.divLogin}>
          <h2>
            Oye, veo que estas intentando acceder a tus Favoritos, pero para
            hacerlo primero debes estar logueado.
          </h2>
          <Button variant="primary" onClick={handleShowModal}>
            Haz click aqui para loguearte.
          </Button>
        </div>
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.title}>
            <h1 className={styles.h1}>These are your favorite products ♥</h1>
          </div>
          {favorites && favorites.length > 0 ? (
            favorites.map((favorite) => (
              <NavLink
                to={`/Detail/${favorite.product_id}`}
                style={{ textDecoration: "none" }}
                className={styles.navlink}
              >
                <div className={styles.card} key={favorite.id}>
                  {favorite.Product && (
                    <>
                      <h2 className={styles.h2}>{favorite.Product.nombre}</h2>
                      <img
                        className={styles.image}
                        src={favorite.Product.imagen}
                        alt={favorite.Product.nombre}
                      />
                      <h2 className={styles.h2}>{favorite.Product.precio}</h2>
                      {/* <h2 className={styles.h2}>
                      {favorite.Product.descripcion}
                    </h2> */}
                    </>
                  )}
                </div>
              </NavLink>
            ))
          ) : (
            <h1 className={styles.nofavs}>No hay favoritos</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;
