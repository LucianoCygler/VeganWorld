import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../redux/actions/actions";
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
    <div
      ref={popupRef}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#f8f8f8",
        padding: "20px",
        border: "2px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        zIndex: 9999,
      }}
    >
      <button onClick={closePopup}>X</button>
      <div style={{ marginBottom: "10px" }}>
        <span
          style={{ fontSize: "20px", fontWeight: "bold", marginRight: "5px" }}
        >
          Estado:
        </span>
        <span>{estado}</span>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <span
          style={{ fontSize: "20px", fontWeight: "bold", marginRight: "5px" }}
        >
          Productos:
        </span>

        <span> {productos} </span>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <span
          style={{ fontSize: "20px", fontWeight: "bold", marginRight: "5px" }}
        >
          Dirección:
        </span>
        <span>{direccion}</span>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <span
          style={{ fontSize: "20px", fontWeight: "bold", marginRight: "5px" }}
        >
          Importe:
        </span>
        <span>{importe}</span>
      </div>
      <div>
        <span
          style={{ fontSize: "20px", fontWeight: "bold", marginRight: "5px" }}
        >
          Fecha de creación:
        </span>
        <span>{fecha}</span>
      </div>

      {estado === "Pendiente" && (
        <button onClick={handleCancelOrder}>Cancelar Pedido</button>
      )}
    </div>
  );
};

export default OrderDetail;
