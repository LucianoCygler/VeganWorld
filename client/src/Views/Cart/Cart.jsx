import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
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
	const { user, cart } = useSelector((state) => state);
	const [subTotal, setSubTotal] = useState(0)

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
		cart.forEach((product) => (subTotalP += product.importe));
		return subTotalP
	}


	const dispatch = useDispatch();

	const handleClick = (event) => {
		const name = event.target.name;
		const id = event.target.value;
		switch (name) {
			case "clear":
				return dispatch(dropProduct(id));
			case "pay":
				return alert("ir al metodo de pago");
			case "postOrder":
				const order = {
					cliente_id: user?.id,
					importe: subTotalF(),
					productos: products(),
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

	useEffect(()=>{
		
		setSubTotal(subTotalF())
	
	},[cart])

	return (
		<div className={styles.mainContainer}>

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
							<h3 className={styles.mount}>{`Total	.	. . . . . . . . . . . . . . . . . . . $ ${subTotal}`}</h3>
						</div>
						<div className={styles.titleOrder}>
							<h2>Order Sumary</h2>
						</div>
						<div className={styles.btnOrder}>
							{/* <button onClick={handleClick} name="pay">
								Pagar
							</button> */}
							<button className={styles.btnGenerate} onClick={handleClick} name="postOrder">
								Generate order
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
