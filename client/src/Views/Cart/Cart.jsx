import React from "react";
import styles from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { dropProduct } from "../../redux/actions/actions"

function Cart() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch()
    
    const handleClick = (event)=>{
        const name = event.target.name
        const id = event.target.value
        if(name === 'clear'){
            console.log(id);
            dispatch(dropProduct(id))
        }else if (name === 'postOrder'){
            dispatch(dropProduct(id))
        }else{
            fetch.post('http://localhost:3001/product')
        }

    }   
    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.tittle} >Cart</h1>
            {cart.length > 0 ? (
                <div className={styles.container}>
                    <button onClick={handleClick} name="pay" >Pagar</button>
                    <button onClick={handleClick} name="postOrder" >Crear orden</button>
                    <hr />
                    {cart.map((product, index) => {
                        return (
                            <>
                            <div className={styles.productsContainer} key={index}>
                                <button name="clear" value={product.id} onClick={handleClick}>X</button>
                                <img src={product.imagen} alt="" style={{width:"150px"}}/>

                                <div className={styles.flexContainer}>
                                    <h2 className={styles.subTittle}>
                                        {product.nombre}
                                    </h2>
                                </div>
                                <div className={styles.flexContainer}>
                                    <h2 className={styles.subTittle}>
                                        {product.precio}
                                    </h2>
                                </div>
                                <div>
                                    <h4>
                                        Cantidad: <span>{product.cantidad}</span>
                                    </h4>
                                </div>
                                <div className={styles.flexContainer}>
                                    <h2 className={styles.subTittle}>
                                       Total: $ {product.importe}
                                    </h2>
                                </div>
                            </div>
                            </>
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