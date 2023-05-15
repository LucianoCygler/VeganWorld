import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../redux/actions/actions";
import styles from "./OrderDetail.module.css";

const OrderDetail = ({ order, closePopup }) => {

  const { estado, direccion, productos, importe, fecha, id } = order;
  const dispatch = useDispatch();
  // Contar los productos repetidos
  const countProducts = productos.reduce((count, producto) => {
    count[producto] = (count[producto] || 0) + 1;
    return count;
  }, {});

  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closePopup();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closePopup]);

  const handleCancelOrder = () => {
    dispatch(deleteOrder(id));
    alert("Pedido cancelado");
    window.location.reload();
  };

  return (
    <div ref={popupRef} className={styles.mainContainer}>
      <div className={styles.buttonDiv}>
        <button className={styles.closeButton} onClick={closePopup}>X</button>
        {estado === "Pendiente" && (
          <button className={styles.buttonCancel} onClick={handleCancelOrder}>Cancelar Pedido</button>
        )}
      </div>
      <div className={styles.flexContainer}>
        <span className={styles.span}>
          Estado:
        </span>
        <span className={styles.spanEstados1}>{estado}</span>
      </div>
      <div className={styles.flexContainer}>
        <span className={styles.span}>
          Productos:
        </span>

        <span className={styles.spanEstados2}>{productos}</span>
      </div>
      <div className={styles.flexContainer}>
        <span className={styles.span}>
          Dirección:
        </span>
        <span className={styles.spanEstados3}>{direccion}</span>
      </div>
      <div className={styles.flexContainer}>
        <span className={styles.span} >
          Importe:
        </span>
        <span className={styles.spanEstados4}>${importe}</span>
      </div>
      <div className={styles.flexContainer}>
        <span className={styles.span}>
          Fecha de creación:
        </span>
        <span className={styles.spanEstados5}>{fecha}</span>
      </div>

    </div>
  );
};

export default OrderDetail;
