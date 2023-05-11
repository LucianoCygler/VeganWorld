import React, { useEffect } from "react";
import style from "./HomePage.module.css"
import { getAllProducts } from "../../redux/actions/actions"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Pagination, Products } from "../../Components/index";

function HomePage() {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state);


    useEffect(()=>{
        dispatch(getAllProducts())
    },[dispatch])

    
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 3;

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = products.slice(startIndex, endIndex);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    return (
        <div className={style.body}>
            <h1 className={style.h1}>The best vegan food in town!</h1>
            <Products currentItems={currentItems} />
            <Pagination
                goToPrevPage={() => setCurrentPage(currentPage - 1)}
                goToNextPage={() => setCurrentPage(currentPage + 1)}
                goToPage={(page) => setCurrentPage(page)}
                currentPage={currentPage}
            />
        </div>
    );
}


export default HomePage;