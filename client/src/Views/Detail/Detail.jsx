import React, { useEffect, useState } from "react";
import styles from "./Detail.module.css";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	getProductById,
	cleanDetail,
	addCartProduct,
} from "../../redux/actions/actions";

function Detail() {
	const { id } = useParams();

	const dispatch = useDispatch();
	
	const [product] = useSelector((state) => state.product);

	const [quantity, setQuantity] = useState(1);

	const handleClick = () => dispatch(addCartProduct(product, quantity));

	const handleChange = (event) => setQuantity(event.target.value);

	useEffect(() => {
		dispatch(getProductById(id));
		return () => dispatch(cleanDetail());
	}, [id]);

	return (
		<>
			{product?.nombre ? (
				<div
					className={styles.mainContainer}
					style={{ backgroundColor: "rgba(42, 66, 49, 0.5)" }}
				>
					<h1>{product.nombre}</h1>
					<img
						src={product.imagen}
						alt={product.nombre}
						style={{ maxWidth: "300px" }}
					/>

					<div>&#11088;&#11088;&#11088;&#11088;&#11088;</div>
					<p>{product.descripcion}</p>
					<div>
						Precio unitario: <span>${product.precio}</span>
					</div>
					<div>Precio al mayor:</div>
					<div>
						Stock:<span></span>
					</div>
					<div></div>
					<NavLink to="/" className={styles.link}>
						<button>Atras</button>
					</NavLink>
					<NavLink to={"/Cart"}>
						<button>Ir al carrito</button>
					</NavLink>

					<input
						type="number"
						name="quantity"
						id=""
						style={{ width: "3rem" }}
						value={quantity}
						min={1}
						max={10}
						onChange={handleChange}
					/>

					<button onClick={handleClick}>Añade al carrito</button>
				</div>
			) : (
				<h1>LOADING...</h1>
			)}
		</>
	);
}

export default Detail;
