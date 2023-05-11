import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Product.module.css";

function Product ({ name, image, price, stock, description, id}) {
    const [isFav, setIsFav] = useState(false);
    const product = { name, image, price, stock, description, id };

    const handleFavorite = () => {
        if(isFav) {
            setIsFav(false);
        } else {
            setIsFav(true);
        }
    }

    return (
        <div className={styles.mainContainer}>
            <div>
                {isFav ? (
                    <div className={styles.favoriteContainer}>
                        <button className={styles.favButton} onClick={handleFavorite}>
                            ❤️
                        </button>
                    </div>
                ) : (
                    <div className={styles.favoriteContainer}>
                        <button className={styles.favButton} onClick={handleFavorite}>
                            🤍
                        </button>
                    </div>
                )}
                <NavLink className={styles.card} to={`/Detail/${product.id}`} style={{textDecoration:'none'}}>
                    <h2 className={styles.subtittle}>{product.name}</h2>
                    <img className={styles.image} src={product.image} alt={product.name} />
                    <h2 className={styles.subtittle}>{product.stock}</h2>
                    <h2 className={styles.subtittle}>{product.price}</h2>
                    <h2 className={styles.subtittle}>{product.description}</h2>
                </NavLink>
            </div> 
        </div>
    )
}

export default Product;