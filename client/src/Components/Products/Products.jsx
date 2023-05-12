import React from "react";
import styles from "./Products.module.css";
import Product from "./Product/Product";

function Products ({ currentItems }) {
    const product = currentItems;

    return (
        <div className={styles.mainContainer}>
            {product.length && product.map(({ nombre, id, descripcion, stock, precio, imagen }) => {
                return (
                    <div className={styles.cardContainer} key={id}>
                        <Product id={id} nombre={nombre} descripcion={descripcion} stock={stock} precio={precio} imagen={imagen} />
                    </div>
                )
            })}
        </div>
    )
}

export default Products;