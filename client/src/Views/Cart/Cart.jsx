import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faRecycle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, dropProduct } from "../../redux/actions/actions";
import Pop_up from "../../Utils/Pop_up/Pop_up";
import { NavLink } from "react-router-dom";

function Cart() {
	const { user, cart } = useSelector((state) => state);

	const [subTotal, setSubTotal] = useState(0);

	const [updateCart, setUpdateCart] = useState(cart);

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
		updateCart.forEach((product) => (subTotalP += product.importe));
		return subTotalP;
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
				try {
					dispatch(createOrder(order));
					Pop_up(
						"success",
						"Order Ceated",
						"You can find your orders in MyOrders!"
					);
				} catch ({ message }) {
					Pop_up("error", "Fail to Create Order", message);
				}
				break;
			case "delete":
				setUpdateCart(updateCart.filter((product) => product.id != id));
				break;
			default:
				return;
		}
	};

	useEffect(() => {
		setSubTotal(subTotalF());
	}, [updateCart]);

	return (
		<div className={styles.mainContainer}>
			{updateCart.length > 0 ? (
				<>
					{updateCart.map((product, index) => {
						return (
							<>
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
										<p className={styles.subTittle}>
											Price: $ {product.precio}
										</p>
									</div>

									<div className={styles.qty}>
										<p>
											Qty: <span>{product.cantidad}</span>
										</p>
										<div>
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
											<span>{` `}</span>
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
										</div>
									</div>

									<div className={styles.delete}>
										<button
											className={styles.btnDelete}
											name="delete"
											value={product.id}
											onClick={handleClick}
										>
											<div className={styles.icon}>
												<FontAwesomeIcon icon={faRecycle} spin size="2xl" />
											</div>
										</button>
									</div>
								</div>
							</>
						);
					})}
					<div className={styles.orderSumary}>
						<div className={styles.subtotal}>
							<h3
								className={styles.mount}
							>{`Total	.	. . . . . . . . . . . . . . . . . . . $ ${subTotal}`}</h3>
						</div>
						<div className={styles.titleOrder}>
							<h2>Order Sumary</h2>
						</div>
						<div className={styles.btnOrder}>
							{/* <button onClick={handleClick} name="pay">
								Pagar
							</button> */}
							{user.id ? (
								<button
									className={styles.btnGenerate}
									onClick={handleClick}
									name="postOrder"
									disabled={!user.id}
								>
									Generate order
								</button>
							) : (
								<NavLink to={"/Login"}>
									<p>Login</p>
								</NavLink>
							)}
						</div>
						<div className={styles.orderTotal}></div>
					</div>
				</>
			) : (
				<h2 className={styles.subTittle}>There is nothing in your car...</h2>
			)}
		</div>
	);
}

export default Cart;
