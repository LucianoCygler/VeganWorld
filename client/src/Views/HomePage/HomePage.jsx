import React, { useEffect, useState } from "react";
import style from "./HomePage.module.css"
import { Link, NavLink } from "react-router-dom";
// import { useState } from "react";
import {getAllProducts} from "../../redux/actions/actions"
import { useDispatch, useSelector } from "react-redux";


function HomePage() {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state);
    // const [currentPage, setCurrentPage] = useState(0);
    // const [orderBy, setOrderBy] = useState("name");
    // const [sortBy, setSortBy] = useState("ASC");
   

    useEffect(()=>{
        dispatch(getAllProducts())
    },[])


    return (
        <div className={style.body}>
            <h1 className={style.h1}>Welcome to VeganWorld!</h1>
            <h1 className={style.h1}>Here, you'll find the best vegan food in town.</h1>
            <div className={style.cardContainer}>
                {products.map((meal) => (
                    <NavLink className={style.card} to={`/Detail/${meal.id}`} style={{textDecoration:'none'}}>
                    <div key={meal.id}  >
                        <img src={meal.image} alt={meal.name} className={style.img} />
                        <div className={style.cardBody}>
                            <h2 className={style.cardTitle}>{meal.name}</h2>
                            <p className={style.cardDescription}>{meal.description}</p>
                            <p className={style.cardPrice}>{`$${meal.price}`}</p>
                        </div>
                    </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default HomePage;