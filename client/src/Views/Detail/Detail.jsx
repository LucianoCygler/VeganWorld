import React, { useEffect, useState } from "react";
import { Ring } from "@uiball/loaders";
import styles from "./Detail.module.css";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	getProductById,
	cleanDetail,
	addCartProduct,
} from "../../redux/actions/actions";
import Pop_up from "../../Utils/Pop_up/Pop_up";

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
					// style={{ backgroundColor: "rgba(42, 66, 49, 0.5)" }}
				>
					<h1>{product.nombre}</h1>
					<img
						src={product.imagen}
						alt={product.nombre}
						style={{ maxWidth: "300px" }}
					/>
					<p>{product.descripcion}</p>
					<div>
						Precio: <span>${product.precio}</span>
					</div>
					{/* <div>Precio al mayor:</div> */}
					<div>
						<span></span>
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

					<button onClick={handleClick}>Add to cart</button>
				</div>
			) : (
        <div style={{paddingTop:"150px"}}>
          <Ring size={200} lineWeight={5} speed={2} color="rgba(29, 103, 88, 0.6)" />
        </div>
			)}
		</>
	);
}

export default Detail;
