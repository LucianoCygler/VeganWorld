import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientOrders } from "../../redux/actions/actions";
import OrderDetail from "../../Components/OrderDetail/OrderDetail";
import "./MyOrders.css";

const MyOrders = () => {
  const clientOrders = useSelector((state) => state.clientOrders);

  const user = useSelector((state) => state.user);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {

    const client_id = user.id;

    dispatch(getClientOrders(client_id));
  }, [dispatch]);

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
      <h1>Aquí se muestran las órdenes del cliente logueado</h1>
      <div className="orders-container">
        {clientOrders?.map((order, index) => (
          <div
            key={index}
            className="order-card"
            onClick={() => showPopupHandler(order)}
          >
            <p>Pedido {index + 1}</p>
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <>
          <div className="overlay" onClick={closePopup} />
          <div className="popup-container">
            <OrderDetail order={selectedOrder} closePopup={closePopup} />
          </div>
        </>
      )}
    </>
  );
};

export default MyOrders;
