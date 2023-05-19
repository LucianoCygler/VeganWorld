import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faRecycle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import './Cart.css';
import {
  cleanCart,
  createOrder,
  dropProduct,
  getMercadoPagoLink,
  newCart,
  sendEmail,
} from "../../redux/actions/actions";
import Pop_up from "../../Utils/Pop_up/Pop_up";
import { NavLink, useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => state);
  const MPLink = useSelector((state) => state.MPLink);

  const [subTotal, setSubTotal] = useState(0);
  const [updateCart, setUpdateCart] = useState(cart);
  const [isOrderGenerated, setIsOrderGenerated] = useState(false);

  function products() {
    const idsProductos = [];

    for (let i = 0; i < cart.length; i++) {
      const { id, cantidad } = cart[i];
      for (let j = 0; j < cantidad; j++) {
        idsProductos.push(id);
      }
    }
    return idsProductos;
  }

  function subTotalF() {
    let subTotalP = 0;
    updateCart?.forEach((product) => (subTotalP += product.importe));
    return subTotalP;
  }

  const dispatch = useDispatch();

  const handleClick = async (event) => {
    const name = event.target.name;
    const id = event.target.value;

    switch (name) {
      case "clear":
        return dispatch(dropProduct(id));
      case "pay":
        dispatch(cleanCart());
        return alert("ir al metodo de pago");
      case "generateOrder":
        var order = {
          cliente_id: user?.id,
          importe: subTotalF(),
          productos: products(),
        };

        try {
          dispatch(createOrder(order));
          Pop_up(
            "success",

            "Order Ceated",
            "You can find your orders in MyOrders!",
            "An E-mail has been sent to your address with the order details."

          );
          setIsOrderGenerated(true);
          const form = {user, order}
          dispatch(sendEmail(form, 'genOrder'));
        } catch ({ message }) {
          Pop_up("error", "Failed to Create Order", message);
        }
        break;
      case "delete":
        setUpdateCart(updateCart.filter((product) => product.id != id));
        break;
      default:
        return;
    }
  };

  const emailAndProducts = {
    email: localStorage.getItem("email"),
    products: [],
  };

  updateCart.map((product) => {
    return emailAndProducts.products.push({
      title: product.nombre,
      description: product.descripcion,
      picture_url: product.imagen,
      category_id: `category123`,
      quantity: parseInt(product.cantidad),
      unit_price: parseInt(product.precio),
    });
  });
  useEffect(() => {
    dispatch(newCart(updateCart));
    setSubTotal(subTotalF());
  }, [updateCart]);

  useEffect(() => {
    if (isOrderGenerated && user.id) {
      dispatch(getMercadoPagoLink(emailAndProducts));
    }
  }, [isOrderGenerated, user.id]);

  useEffect(() => {
    if (MPLink) {
      window.location.href = MPLink;
    }
  }, [MPLink]);

  return (
    <div className={styles.mainContainer}>
      {cart !== null && updateCart.length > 0 ? (
        <>
          {updateCart.map((product, index) => {
            return (
              <div
                className={styles.productsContainer}
                key={index}
                style={{ gridRow: `${index + 1}` }}
              >
                <div className={styles.flexContainer}>
                  <h3 className={styles.subTittle}>
                    subTotal: $ {product.importe}
                  </h3>
                </div>

                <div className={styles.imagen}>
                  <img src={product.imagen} alt="" style={{ width: "150px" }} />
                </div>

                <div className={styles.nombre}>
                  <p className={styles.subTittle}>{product.nombre}</p>
                </div>

                <div className={styles.precio}>
                  <p className={styles.subTittle}>Price: $ {product.precio}</p>
                </div>

                <div className={styles.qty}>
                  <p>
                    Qty: <span>{product.cantidad}</span>
                  </p>
                  <div className={styles.btnsQty}>
                    <button
                      name="decrement"
                      onClick={() => {
                        const updatedCart = [...updateCart];
                        if (updatedCart[index].cantidad > 1) {
                          updatedCart[index].cantidad -= 1;
                          updatedCart[index].importe =
                            updatedCart[index].precio *
                            updatedCart[index].cantidad;
                        }
                        setUpdateCart(updatedCart);
                      }}
                    >
                      -
                    </button>
                    <span>{` `}</span>
                    <button
                      name="increment"
                      onClick={() => {
                        const updatedCart = [...updateCart];
                        updatedCart[index].cantidad += 1;
                        updatedCart[index].importe =
                          updatedCart[index].precio *
                          updatedCart[index].cantidad;
                        setUpdateCart(updatedCart);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className={styles.delete}>
                <button class="buttonDelete"
                name="delete"
                onClick={handleClick}
                value={product.id}>
                  <svg viewBox="0 0 448 512" class="svgIcon" >
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" ></path>
                    </svg>
                </button>
                </div>
              </div>
            );
          })}
          <div className={styles.orderSumary}>
            <div className={styles.subtotal}>
              <h3 className={styles.mount}>
                Total . . . . . . . . . . . . . . . . . . . $ {subTotal}
              </h3>
            </div>
            <div className={styles.titleOrder}>
              <h2>Order Summary</h2>
            </div>
            <div className={styles.btnOrder}>
              {user.id ? (
                <>
                  {!isOrderGenerated ? (
                    <button
                      className={styles.btnGenerate}
                      onClick={handleClick}
                      name="generateOrder"
                      disabled={!user.id}
                    >
                      Generate order
                    </button>
                  ) : (
                    <button
                      className={styles.btnGenerate}
                      onClick={handleClick}
                      name="pay"
                    >
                      Pay
                    </button>
                  )}
                </>
              ) : (
                <NavLink to={"/login"}>
                  <p>Login</p>
                </NavLink>
              )}
            </div>
            <div className={styles.orderTotal}></div>
          </div>
        </>
      ) : (
        <h2 className={styles.subTittle}>There is nothing in your cart...</h2>
      )}
    </div>
  );
}

export default Cart;
