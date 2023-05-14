import React, { useEffect, useState } from "react";
import { Ring } from "@uiball/loaders";
import styles from "./Detail.module.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  cleanDetail,
  addCartProduct,
} from "../../redux/actions/actions";
import Pop_up from "../../Utils/Pop_up/Pop_up";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product] = useSelector((state) => state.product);
  const [quantity, setQuantity] = useState(1);
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
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  useEffect(() => {
    dispatch(getProductById(id));
    return () => dispatch(cleanDetail());
  }, [id]);

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
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  useEffect(() => {
    dispatch(getProductById(id));
    return () => dispatch(cleanDetail());
  }, [id]);

	return (
		<div className={styles.mainContainer}>
			<div className={styles.container}>
				<div className={styles.linkContainer}>
					<Link to="/" className={styles.linkBack}>
						<FontAwesomeIcon icon={faArrowLeftLong} />	
					</Link>
				</div>
				{product?.nombre ? (
					<div className={styles.descriptionDiv}>
						<div className={styles.imageDiv}>
							<img src={product.imagen} alt={product.nombre} className={styles.image}/>
						</div>
						<div className={styles.detailDiv}>
							<h1 className={styles.h1}>{product.nombre}</h1>
							<h2>★★★★</h2>
							<h3 className={styles.p}>{product.descripcion}</h3>
							<div className={styles.priceDiv}>
								<h2 className={styles.price}>Precio: <span className={styles.spanPrice}>${product.precio}</span></h2>
							</div>
							<div className={styles.productValue}>
								<h2 className={styles.h1}>Cantidad:</h2>
								<h3 className={styles.quantitySpan}>{quantity}</h3>
								<button className={styles.quantityButton} onClick={handleDecrement}>-</button>
								<button className={styles.quantityButton} onClick={handleIncrement}>+</button>
								<button className={styles.button} onClick={handleClick}>Add to cart</button>
							</div>
						</div>
					</div>
				) : (
					<div style={{paddingTop:"150px"}}>
          				<Ring size={200} lineWeight={5} speed={2} color="rgba(29, 103, 88, 0.6)" />
        			</div>
				)}
			</div>
		</div>
	);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.linkContainer}>
          <Link to="/" className={styles.linkBack}>
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </Link>
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
              <h2>★★★★</h2>
              <h3 className={styles.p}>{product.descripcion}</h3>
              <div className={styles.priceDiv}>
                <h2 className={styles.price}>
                  Precio:{" "}
                  <span className={styles.spanPrice}>${product.precio}</span>
                </h2>
              </div>
              <div className={styles.productValue}>
                <h2>Cantidad:</h2>
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
      </div>
    </div>
  );
}
