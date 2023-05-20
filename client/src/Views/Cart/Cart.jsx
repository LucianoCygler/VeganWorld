import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faRecycle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
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
import { Button, Modal } from "react-bootstrap";
import LoginForm from "../Login/LoginForm";

function Cart() {
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => state);
  const MPLink = useSelector((state) => state.MPLink);
  const [loading, setLoading] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [updateCart, setUpdateCart] = useState(cart);
  const [isOrderGenerated, setIsOrderGenerated] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  function subTotalF() {
    let subTotalP = 0;
    updateCart?.forEach((product) => (subTotalP += product.importe));
    return subTotalP;
  }

  const dispatch = useDispatch();

  const handleClick = async (event) => {
    const name = event.target.name;
    const id = event.target.value;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);

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
          dispatch(createOrder(order)).then((order) => {
            const form = { user: user, order: order };
            dispatch(sendEmail(form, "genOrder"));
          });

          Pop_up(
            "success",
            "Order Ceated",
            "You can find your orders in MyOrders!",
            "An E-mail has been sent to your address with the order details."
          );
          setIsOrderGenerated(true);
          const form = { user, order };
          dispatch(sendEmail(form, "genOrder"));
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm handleCloseModal={handleCloseModal}></LoginForm>{" "}
        </Modal.Body>
      </Modal>
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
                  <button
                    className={styles.btn}
                    name="delete"
                    value={product.id}
                    onClick={handleClick}
                  >
                    <svg
                      viewBox="0 0 15 17.5"
                      height="17.5"
                      width="15"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.icon}
                    >
                      <path
                        transform="translate(-2.5 -1.25)"
                        d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                        id="Fill"
                      ></path>
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
                  <Button
                    onClick={handleClick}
                    name="generateOrder"
                    isLoading={loading}
                    colorScheme="teal"
                  >
                    Generate order
                  </Button>
                </>
              ) : (
                <Button variant="primary" onClick={handleShowModal}>
                  Login to create Order!
                </Button>
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
