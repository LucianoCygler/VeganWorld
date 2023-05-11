import React from "react";
import styles from "./Products.module.css";
import Product from "./Product/Product";

function Products ({ currentItems }) {
    const product = currentItems;

    return (
        <div className={styles.mainContainer}>
            {product.length && product.map(({ name, id, description, stock, price, image }) => {
                return (
                    <div className={styles.cardContainer} key={id}>
                        <Product id={id} name={name} description={description} stock={stock} price={price} image={image} />
                    </div>
                )
            })}
        </div>
    )
}

export default Products;