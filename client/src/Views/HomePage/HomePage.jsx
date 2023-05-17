import React, { useEffect, useState } from "react";
import style from "./HomePage.module.css";
import { getAllProducts } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { CustomerComments, Pagination, Products } from "../../Components/index";
import { orderAndFilter } from "../../redux/actions/actions";
import { Box } from "@chakra-ui/react";

function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [filterByType, setFilterByType] = useState("");
  const [sort, setSort] = useState("");
  // const [sortByPrice, setSortByPrice] = useState("");

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    dispatch(orderAndFilter(filterByType, sort));
  }, [filterByType, sort]);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 12;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleFilter = (e) => {
    setFilterByType(e.target.value);
  };
  const handleSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <Box >
      <div className={style.body}>
        <h1 className={style.h1}>The best vegan food in town!</h1>
      Filter By Type:{" "}
        <select onChange={handleFilter}>
          <option value="">All</option>
          <option value="pasta">Pasta</option>
          <option value="snack">Snack</option>
          <option value="fruta">Fruta</option>
          <option value="bebida">Bebida</option>
        </select>
        Order:{" "}
        <select value={sort} onChange={handleSort}>
          <option value=""></option>
          <option value="a-z">Name a-z</option>
          <option value="z-a">Name z-a</option>
          <option value="Menor precio">Mayor precio</option>
          <option value="Mayor precio">Menor precio</option>
        </select>
        {/* Order By Price:{" "}
        <select value={sortByPrice} onChange={handleSortByPrice}>
          <option value=""></option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select> */}
        <Products products={currentItems} />
        <Pagination
          goToPrevPage={() => setCurrentPage(currentPage - 1)}
          goToNextPage={() => setCurrentPage(currentPage + 1)}
          goToPage={(page) => setCurrentPage(page)}
          currentPage={currentPage}
          lastPage={totalPages}
        />
      </div>
    </Box>
  );
}

export default HomePage;
