import React from "react";
import { useSelector } from "react-redux";
import styles from "./Cart.module.css";

function Cart() {
    const cart = useSelector((state) => state.cart);

    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.tittle} >Cart</h1>
            {cart.length > 0 ? (
                <div className={styles.container}>
                    {cart.map(product => {
                        return (
                            <div className={styles.productsContainer} key={product.id}>
                                <h2 className={styles.subTittle}>
                                    {product.name}
                                </h2>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <h2 className={styles.subTittle}>There is nothing in your car...</h2>
            )}
        </div>
    )
}

export default Cart;