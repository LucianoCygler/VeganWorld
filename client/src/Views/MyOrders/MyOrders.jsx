import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientOrders } from "../../redux/actions/actions";
import OrderDetail from "../../Components/OrderDetail/OrderDetail";
import styles from "./MyOrders.module.css";

const MyOrders = () => {
  const clientOrders = useSelector((state) => state.clientOrders);
  const user = useSelector((state) => state.user);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const client_id = user.id;
    dispatch(getClientOrders(client_id));
  }, []);

  const showPopupHandler = (order) => {
    setSelectedOrder(order);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedOrder(null);
    setIsPopupOpen(false);
  };

  return (
    <>
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
    </>
  );
};

export default MyOrders;
