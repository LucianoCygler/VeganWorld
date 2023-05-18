import React, { useEffect, useState } from "react";
import { Ring } from "@uiball/loaders";
import styles from "./Detail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  cleanDetail,
  addCartProduct,
  getProductReviews,
} from "../../redux/actions/actions";
import Pop_up from "../../Utils/Pop_up/Pop_up";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product] = useSelector((state) => state.product);
  const productReviews = useSelector((state) => state.productReviews);

  const [quantity, setQuantity] = useState(1);
  const product_id = id;

  useEffect(() => {
    dispatch(getProductById(id));
    return () => dispatch(cleanDetail());
  }, [dispatch, id]);
  useEffect(() => {
    if (product_id) {
      return dispatch(getProductReviews(product_id));
    }

  const handleClick = () => {
    try {
      dispatch(addCartProduct(product, quantity));
      Pop_up("success", "Product added", "You can find your products in Cart!");
    } catch ({ message }) {
      Pop_up("info", "Product added", message);
    }
  };

  const handleDecrement = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  const handleIncrement = () => {
    if (quantity < 100) {
      setQuantity(quantity + 1);
    }
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.linkContainer}>
          <NavLink to="#" className={styles.linkBack} onClick={handleGoBack}>
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </NavLink>
        </div>
        {product?.nombre ? (
          <div className={styles.descriptionDiv}>
            <div className={styles.imageDiv}>
              <img
                src={product.imagen}
                alt={product.nombre}
                className={styles.image}
              />
            </div>
            <div className={styles.detailDiv}>
              <h1 className={styles.h1}>{product.nombre}</h1>
              <h3 className={styles.p}>{product.descripcion}</h3>
              <div className={styles.priceDiv}>
                <h2 className={styles.price}>
                  Precio:{" "}
                  <span className={styles.spanPrice}>${product.precio}</span>
                </h2>
              </div>
              <div className={styles.productValue}>
                <h2 className={styles.h1}>Cantidad:</h2>
                <h3 className={styles.quantitySpan}>{quantity}</h3>
                <button
                  className={styles.quantityButton}
                  onClick={handleDecrement}
                >
                  -
                </button>
                <button
                  className={styles.quantityButton}
                  onClick={handleIncrement}
                >
                  +
                </button>
                <button className={styles.button} onClick={handleClick}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ paddingTop: "150px" }}>
            <Ring
              size={200}
              lineWeight={5}
              speed={2}
              color="rgba(29, 103, 88, 0.6)"
            />
          </div>
        )}
        <div className={styles.cardcontenedor}>
          {productReviews
            ? productReviews.slice(0, 3).map((review) => {
                return (
                  <div className={styles.card} key={review.id}>
                    <>
                      <span>{review.cliente_nombre}</span>
                      <h1>{review.titulo}</h1>
                      <p>{review.descripcion}</p>
                      <p>{review.fecha}</p>
                    </>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}
export default Detail;
