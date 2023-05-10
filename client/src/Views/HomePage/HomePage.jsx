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
    // const veganMeals = [
    //     {
    //         id: 1,
    //         name: "Hamburguesa de lentejas",
    //         description: "Hamburguesa de lentejas, acompañada de lechuga, tomate, cebolla y mayonesa vegana.",
    //         price: 150,
    //         weight: "150g",
    //         image: "https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg"
    //     },
    //     {
    //         id: 2,
    //         name: "Pizza de verduras",
    //         description: "Pizza vegana con una base de tomate y especias, cubierta de verduras frescas y queso vegano.",
    //         price: 200,
    //         weight: "300g",
    //         image: "https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg"
    //     },
    //     {
    //         id: 3,
    //         name: "Sándwich de aguacate y tofu",
    //         description: "Sándwich vegano con aguacate, tofu, lechuga y tomate, en pan integral.",
    //         price: 120,
    //         weight: "200g",
    //         image: "https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg"
    //     },
    //     {
    //         id: 4,
    //         name: "Ensalada de quinoa",
    //         description: "Ensalada vegana de quinoa con tomate, pepino, cebolla, aceitunas y aliño de limón.",
    //         price: 90,
    //         weight: "250g",
    //         image: "https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg"
    //     },
    //     {
    //         id: 5,
    //         name: "Wrap de falafel",
    //         description: "Wrap vegano con falafel, hummus, tomate, cebolla y lechuga, envuelto en tortilla integral.",
    //         price: 130,
    //         weight: "200g",
    //         image: "https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg"
    //     },
    //     {
    //         id: 6,
    //         name: "Curry de garbanzos",
    //         description: "Curry vegano de garbanzos con arroz integral, tomate, cebolla y especias.",
    //         price: 180,
    //         weight: "300g",
    //         image: "https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg"
    //     },
    //     {
    //         id: 7,
    //         name: "Tacos de coliflor",
    //         description: "Tacos veganos de coliflor, con guacamole, tomate, cebolla y cilantro.",
    //         price: 160,
    //         weight: "250g",
    //         image: "https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg"
    //     },
    //     {
    //         id: 8,
    //         name: "Sopa de lentejas y espinacas",
    //         description: "Una sopa cremosa de lentejas y espinacas, con un toque de jengibre y comino. Servida con pan integral.",
    //         price: 100,
    //         weight: "300g",
    //         image: "https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg"        },
    //     {
    //         id: 9,
    //         name: "Ensalada de tofu y frutos secos",
    //         description: "Ensalada fresca de tofu, lechuga, zanahoria y frutos secos con aderezo de mostaza y miel.",
    //         price: 120,
    //         weight: "250g",
    //         image: "https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg"        },
    //     {
    //         id: 10,
    //         name: "Curry de calabaza y garbanzos",
    //         description: "Un delicioso curry vegano de calabaza y garbanzos con arroz integral y un toque de cilantro fresco.",
    //         price: 180,
    //         weight: "300g",
    //         image: "https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg"          },
    //       {
    //         id: 11,
    //         name: "Hamburguesa de tofu y remolacha",
    //         description: "Acompañada de lechuga, tomate y mayonesa vegana en pan integral.",
    //         price: 150,
    //         weight: "200g",
    //         image: "https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg"          },
    //       {
    //         id: 12,
    //         name: "Tarta de chocolate y almendras",
    //         description: "Un postre vegano irresistible, con un toque de vainilla y servida con una bola de helado vegano.",
    //         price: 90,
    //         weight: "150g",
    //         image: "https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg"          },
    // ];

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