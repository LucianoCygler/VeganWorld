import React, { useEffect } from "react";
import style from "./HomePage.module.css"
import { getAllProducts } from "../../redux/actions/actions"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Pagination, Products } from "../../Components/index";

function HomePage() {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state);
    // const [orderBy, setOrderBy] = useState("name");
    // const [sortBy, setSortBy] = useState("ASC");
   

    useEffect(()=>{
        dispatch(getAllProducts())
    },[dispatch])

    
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 3;

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = products.slice(startIndex, endIndex);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber - 1);
    };

    return (
        <div className={style.body}>
            <h1 className={style.h1}>The best vegan food in town!</h1>
            <Products currentItems={currentItems} />
            <Pagination
                goToPrevPage={() => setCurrentPage(currentPage - 1)}
                goToNextPage={() => setCurrentPage(currentPage + 1)}
                goToPage={(page) => setCurrentPage(page)}
                lastPage={() => setCurrentPage(totalPages)}
                onChange={handlePageChange}
            />
        </div>
    );
}


export default HomePage;