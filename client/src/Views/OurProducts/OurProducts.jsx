import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  getClientAllFavorites,
  getUserDataByEmail,
  sor,
} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Products } from "../../Components/index";
import { orderAndFilter } from "../../redux/actions/actions";
import style from "./OurProducts.module.css";
import { Select, Text } from "@chakra-ui/react";
import { Box, Flex, Grid, GridItem, Img } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

function OurProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const [filterByType, setFilterByType] = useState("");
  const [sort, setSort] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const email = localStorage.getItem("email");

  useEffect(() => {
    dispatch(getAllProducts());
    // dispatch(getClientAllFavorites(user.id));
  }, []);
  useEffect(() => {
    dispatch(orderAndFilter(filterByType, sort));
  }, [filterByType, sort]);

  useEffect(() => {
    dispatch(getUserDataByEmail(email));
  }, [email]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Desactiva el loader después de 3 segundos
    }, 1000);

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
  }, []);
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
    <Box
      minH={"100vh"}
      overflow={"hidden"}
      bg={"# d8d8d8"}
      paddingTop={15}
      backgroundImage={"https://wallpaperaccess.com/full/1812875.jpg"}
      bgSize={"cover"}
      bgRepeat={"no-repeat"}
    >
      <Box
        marginTop={"6em"}
        paddingTop={"0em"}
        display={"center"}
        justifyContent={"center"}
      >
        <Text
          fontSize={"30px"}
          color="white"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
          position="relative"
          top={"0.2em"}
        >
          PRODUCTS
          <Text
            as="span"
            position="absolute"
            left={"1%"}
            bottom={-5} // Ajusta este valor según el espaciado deseado
            width="30%"
            height="3px"
            background="orange"
          />
        </Text>
      </Box>{" "}
      {/* <h1 className={style.h1}>The best vegan food in town!</h1> */}
      <Flex
        direction={"row"}
        margin={"auto"}
        justifyContent={"center"}
        marginTop={"3em"}
        marginBottom={"3em"}
      >
        <Select onChange={handleFilter} w={200} marginRight={4} bg="#d8d8d8">
          <option value="">All</option>
          <option value="pasta">Pasta</option>
          <option value="snack">Snack</option>
          <option value="fruta">Fruta</option>
          <option value="bebida">Bebida</option>
        </Select>
        <Select w={200} value={sort} onChange={handleSort} bg="#d8d8d8">
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
        <Box>
          {" "}
          <Box display="flex" justifyContent="center">
            <Box>
              <Pagination
                goToPrevPage={() => setCurrentPage(currentPage - 1)}
                goToNextPage={() => setCurrentPage(currentPage + 1)}
                goToPage={(page) => setCurrentPage(page)}
                currentPage={currentPage}
                lastPage={totalPages}
              />
            </Box>
          </Box>
          <Divider />
          <Box display="flex" marginTop={"5em"} justifyContent={"center"}>
            <Box w={"80%"}>
              <Products products={currentItems} />
            </Box>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="center">
            <Box>
              <Pagination
                goToPrevPage={() => setCurrentPage(currentPage - 1)}
                goToNextPage={() => setCurrentPage(currentPage + 1)}
                goToPage={(page) => setCurrentPage(page)}
                currentPage={currentPage}
                lastPage={totalPages}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default OurProducts;
