import React from "react";
import styles from "./Cart.module.css";
import Swal from "sweetalert2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faRecycle } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  decrementProduct,
  dropProduct,
  incrementProduct,
} from "../../redux/actions/actions";
import Pop_up from "../../Utils/Pop_up/Pop_up";
import { NavLink } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    const name = event.target.name;
    const id = event.target.value;
    switch (name) {
      case "clear":
        return dispatch(dropProduct(id));
      case "play":
        return alert("ir al metodo de pago");
      case "postOrder":
        let importeTotal = 0;
        cart.forEach((product) => (importeTotal += product.importe));
        const order = {
          cliente_id: user?.id,
          importe: importeTotal,
          productos: cart.map((product) => product.id),
        };
        Pop_up(
          "success",
          "Order Ceated",
          "You can find your orders in MyOrders!"
        );
        return dispatch(createOrder(order));
      // case "increment":
      // 	return dispatch(incrementProduct(id));
      // case "decrement":
      // 	return dispatch(decrementProduct(id));
      default:
        return;
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.tittle}>
        <h1>Cart</h1>
      </div>

      {cart.length > 0 ? (
        // <div className={styles.container}>
        <>
          {cart.map((product, index) => {
            return (
              <>
                <div
                  className={styles.productsContainer}
                  key={index}
                  style={{ gridRow: `${index + 1}` }}
                >
                  {/*<div>

										<button name="increment" onClick={handleClick}>
											+
										</button>
										<button name="decrement" onClick={handleClick}>
											-
										</button> 
									</div>
									<div className={styles.flexContainer}>
										<h2 className={styles.subTittle}>
											Total: $ {product.importe}
										</h2>
									</div>*/}

                  <div className={styles.imagen}>
                    <img
                      src={product.imagen}
                      alt=""
                      style={{ width: "150px" }}
                    />
                  </div>

                  <div className={styles.nombre}>
                    <p className={styles.subTittle}>{product.nombre}</p>
                  </div>

                  <div className={styles.precio}>
                    <p className={styles.subTittle}>{product.precio}</p>
                  </div>

                  <div className={styles.qty}>
                    <p>
                      Cantidad: <span>{product.cantidad}</span>
                    </p>
                  </div>

                  <div className={styles.delete}>
                    <button>
                      <FontAwesomeIcon
                        icon={faRecycle}
                        name="clear"
                        value={product.id}
                        onClick={handleClick}
                      />
                    </button>
                  </div>
                  <div>
                    <NavLink>
                      <p>Edit</p>
                    </NavLink>
                  </div>
                </div>
              </>
            );
          })}
          <div className={styles.orderSumary}>
            <div className={styles.subtotal}>
              <h4>suma de precio de productos</h4>
            </div>
            <div className={styles.titleOrder}>
              <h2>Order Sumary</h2>
            </div>
            <div className={styles.btnOrder}>
              {/* <button onClick={handleClick} name="pay">
								Pagar
							</button> */}
              <button onClick={handleClick} name="postOrder">
                Crear orden
              </button>
            </div>
            <div className={styles.orderTotal}></div>
          </div>
        </>
      ) : (
        // </div>
        <h2 className={styles.subTittle}>There is nothing in your car...</h2>
      )}
    </div>
  );
}

export default Cart;
