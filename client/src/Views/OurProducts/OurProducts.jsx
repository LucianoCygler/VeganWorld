import React, { useEffect, useState } from "react";
import { getAllProducts, sor } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Products } from "../../Components/index";
import { orderAndFilter } from "../../redux/actions/actions";
import style from "./OurProducts.module.css";
import { Select } from "@chakra-ui/react";
import { Box, Flex, Grid, GridItem, Img } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";

function OurProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [filterByType, setFilterByType] = useState("");
  const [sort, setSort] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

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
    <Box bg={"# d8d8d8"} marginTop={-20}>
      <h1 className={style.h1}>The best vegan food in town!</h1>
      <Divider />

      <Flex direction={"row"} margin={"auto"} justifyContent={"center"}>
        <Select
          placeholder="All"
          onChange={handleFilter}
          w={200}
          marginRight={4}
        >
          <option value="pasta">Pasta</option>
          <option value="snack">Snack</option>
          <option value="fruta">Fruta</option>
          <option value="bebida">Bebida</option>
        </Select>
        <Select placeholder="Order" w={200} value={sort} onChange={handleSort}>
          <option value="a-z">Name a-z</option>
          <option value="z-a">Name z-a</option>
          <option value="Menor precio">Mayor precio</option>
          <option value="Mayor precio">Menor precio</option>
        </Select>
      </Flex>
      <Divider />

      <Products products={currentItems} />
      <Pagination
        goToPrevPage={() => setCurrentPage(currentPage - 1)}
        goToNextPage={() => setCurrentPage(currentPage + 1)}
        goToPage={(page) => setCurrentPage(page)}
        currentPage={currentPage}
        lastPage={totalPages}
      />
    </Box>
  );
}

export default OurProducts;
