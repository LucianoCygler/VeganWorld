import React from "react";
import style from "./HomePage.module.css"
// import { useState } from "react";


function HomePage() {
    // const dispatch = useDispatch();
    // const { products } = useSelector(state => state);
    // const [currentPage, setCurrentPage] = useState(0);
    // const [orderBy, setOrderBy] = useState("name");
    // const [sortBy, setSortBy] = useState("ASC");


    return(
        <div className={style.body}>
            <h1>Welcome to VeganWorld!</h1>
            <p>Here, you'll find the best vegan food in town.</p>
            <img src="https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg" />
            <a href="/menu">View our menu</a>
        </div>
    )
}

export default HomePage;