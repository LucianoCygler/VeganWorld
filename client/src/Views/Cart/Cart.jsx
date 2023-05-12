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
                    <button onClick={handleClick}>Pagar</button>
                    <hr />
                    {cart.map((product, index) => {
                        // console.log(product);
                        // console.log(Object.values(product)[0].id);
                        return (
                            <>
                            <div className={styles.productsContainer} key={index}>
                                <button name="clear" value={Number(Object.values(product)[0].id)}>X</button>
                                <img src={Object.values(product)[0].imagen} alt="" style={{width:"150px"}}/>

                                <div className={styles.flexContainer}>
                                    <h2 className={styles.subTittle}>
                                        {Object.keys(product)}
                                    </h2>
                                </div>
                                <div className={styles.flexContainer}>
                                    <h2 className={styles.subTittle}>
                                        {Object.values(product)[0].precio}
                                    </h2>
                                </div>
                                <div>
                                    <h4>
                                        Cantidad: <span>{Object.values(product)[0].cantidad}</span>
                                    </h4>
                                </div>
                                <div className={styles.flexContainer}>
                                    <h2 className={styles.subTittle}>
                                       Total: $ {Object.values(product)[0].importe}
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