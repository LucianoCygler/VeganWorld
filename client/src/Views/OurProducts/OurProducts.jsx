import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  getUserDataByEmail,
  sor,
} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Products } from "../../Components/index";
import { orderAndFilter } from "../../redux/actions/actions";
import style from "./OurProducts.module.css";
import { Select } from "@chakra-ui/react";
import { Box, Flex, Grid, GridItem, Img } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

function OurProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const [filterByType, setFilterByType] = useState("");
  const [sort, setSort] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const email = localStorage.getItem("email");
  useEffect(() => {
    dispatch(orderAndFilter());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Desactiva el loader después de 3 segundos
    }, 1000);

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
  }, []);

  useEffect(() => {
    dispatch(orderAndFilter(filterByType, sort));
  }, [filterByType, sort, dispatch]);
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

      <Flex direction={"row"} margin={"auto"} justifyContent={"center"}>
        <Select onChange={handleFilter} w={200} marginRight={4}>
          <option value="">All</option>
          <option value="pasta">Pasta</option>
          <option value="snack">Snack</option>
          <option value="fruta">Fruta</option>
          <option value="bebida">Bebida</option>
        </Select>
        <Select w={200} value={sort} onChange={handleSort}>
          <option value="">Order</option>
          <option value="a-z">Name a-z</option>
          <option value="z-a">Name z-a</option>
          <option value="Menor precio">Mayor precio</option>
          <option value="Mayor precio">Menor precio</option>
        </Select>
      </Flex>
      {isLoading ? (
        <Spinner
          size="xl"
          marginTop={"5em"}
          emptyColor="gray.200"
          color="teal.500"
        /> // Muestra el componente de Loader mientras isLoading sea true
      ) : (
        <Products products={currentItems} />
      )}

      <Divider />

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
