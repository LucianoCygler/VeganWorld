import React, { useEffect, useState } from "react";
import style from "./HomePage.module.css";
import { getAllProducts } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Products } from "../../Components/index";
import { orderAndFilter } from "../../redux/actions/actions";

function HomePage() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state);
  const [filterByType, setFilterByType] = useState("");
  const [sortByName, setSortByName] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  useEffect(() => {
    dispatch(orderAndFilter(filterByType, sortByName, sortByPrice));
  }, [filterByType, sortByName, sortByPrice]);

  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleFilter = (e) => {
    setFilterByType(e.target.value);
  };
  const handleSortByName = (e) => {
    setSortByName(e.target.value);
    setSortByPrice("");
  };
  const handleSortByPrice = (e) => {
    setSortByPrice(e.target.value);
    setSortByName("");
  };

  return (
    <div className={style.body}>
      Filter By Type:{" "}
      <select onChange={handleFilter}>
        <option value="">All</option>
        <option value="pasta">Pasta</option>
        <option value="snack">Snack</option>
        <option value="fruta">Fruta</option>
        <option value="bebida">Bebida</option>
      </select>
      Order By Name:{" "}
      <select value={sortByName} onChange={handleSortByName}>
        <option value=""></option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      Order By Price:{" "}
      <select value={sortByPrice} onChange={handleSortByPrice}>
        <option value=""></option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <h1 className={style.h1}>The best vegan food in town!</h1>
      <Products currentItems={currentItems} />
      <Pagination
        goToPrevPage={() => setCurrentPage(currentPage - 1)}
        goToNextPage={() => setCurrentPage(currentPage + 1)}
        goToPage={(page) => setCurrentPage(page)}
        currentPage={currentPage}
        lastPage={totalPages}
      />
    </div>
  );
}

export default HomePage;
