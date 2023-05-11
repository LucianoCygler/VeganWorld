import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, cleanDetail, addCartProduct } from "../../redux/actions/actions";

function Detail() {
	const { id } = useParams();

	const dispatch = useDispatch();
	const [product] = useSelector((state) => state.product);

    const handleClick = () => dispatch(addCartProduct(product))

	useEffect(() => {
		dispatch(getProductById(id));
		return () => {
			dispatch(cleanDetail());
		};
	}, []);

	return (
		<>
			{product?.name ? (
				<div className={styles.mainContainer}>
					<h1>{product?.name}</h1>
					<img
						src={product?.image}
						alt={product?.name}
						style={{ maxWidth: "300px" }}
					/>
                    <p>{product.description}</p>
					<div>Precio unitario:</div>
					<div>Precio al mayor:</div>
					<div>
						Stock:<span></span>
					</div>
					<NavLink to="/Home" className={styles.link}>
						<button>Atras</button>
					</NavLink>
					<NavLink to={"/Cart"}>
						<button onClick={handleClick}>Comprar</button>
					</NavLink>
				</div>
			) : (
				<h1>LOADING...</h1>
			)}
		</>
	);
}

export default Detail;
