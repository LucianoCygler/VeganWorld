import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientOrders,
  getUserDataByEmail,
} from "../../redux/actions/actions";
import OrderDetail from "../../Components/OrderDetail/OrderDetail";
import styles from "./MyOrders.module.css";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import LoginForm from "../Login/LoginForm";

const MyOrders = () => {
  const clientOrders = useSelector((state) => state.clientOrders);
  const user = useSelector((state) => state.user);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const closePopup = () => {
    setSelectedOrder(null);
    setIsPopupOpen(false);
  };

  useEffect(() => {
    dispatch(getUserDataByEmail(email));
  }, [email]);

  useEffect(() => {
    if (user) {
      const client_id = user.id;
      dispatch(getClientOrders(client_id));
    }
  }, [user, selectedOrder]);
  const showPopupHandler = (order) => {
    if (user.id) {
      setSelectedOrder(order);
      setIsPopupOpen(true);
    } else {
      setIsPopupOpen(false);
      // Abre el popup de inicio de sesión
      setIsLoginOpen(true);
    }
  };
  //asd
  const handleLoginClose = (order) => {
    setIsLoginOpen(false);
  };

  return (
    <div>
      {" "}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm handleCloseModal={handleCloseModal}></LoginForm>{" "}
        </Modal.Body>
      </Modal>
      {!email ? (
        <div className={styles.divLogin}>
          <h2>
            Hey, I see that you are trying to access your Orders, but to do so,
            you must first be logged in.
          </h2>
          <Button variant="primary" onClick={handleShowModal}>
            Click here to log in!
          </Button>
        </div>
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.orderscontainer}>
            <h1>ORDERS</h1>
            {!localStorage.getItem("email") ? (
              <div className={styles.divLogin}>
                <h2>
                  Oye, veo que estas intentando acceder a tus órdenes, pero para
                  hacerlo primero debes estar logueado.{" "}
                </h2>
                <Button variant="primary" onClick={handleShowModal}>
                  Haz click aqui para loguearte.
                </Button>
              </div>
            ) : (
              <div>
                {" "}
                {clientOrders?.map((order, index) => (
                  <div
                    key={index}
                    className={styles.ordercard}
                    onClick={() => showPopupHandler(order)}
                  >
                    <p>Pedido {index + 1}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {isPopupOpen && (
            <>
              <div className={styles.overlay} onClick={closePopup} />
              <div className={styles.popupcontainer}>
                <OrderDetail order={selectedOrder} closePopup={closePopup} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
