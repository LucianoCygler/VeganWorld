import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientOrders,
  getUserDataByEmail,
} from "../../redux/actions/actions";
import OrderDetail from "./OrderDetail/OrderDetail";
import styles from "./MyOrders.module.css";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import LoginForm from "../Login/LoginForm";

const MyOrders = () => {
  const clientOrders = useSelector((state) => state.clientOrders);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
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

  const handleLoginClose = (order) => {
    setIsLoginOpen(false);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.orderscontainer}>
        <h1>ORDERS</h1>
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
      {isPopupOpen && (
        <>
          <div className={styles.overlay} onClick={closePopup} />
          <div className={styles.popupcontainer}>
            <OrderDetail order={selectedOrder} closePopup={closePopup} />
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrders;
