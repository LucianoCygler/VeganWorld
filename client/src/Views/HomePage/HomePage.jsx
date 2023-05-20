import React, { useEffect, useState } from "react";
import style from "./HomePage.module.css";
import { getAllProducts } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Products } from "../../Components/index";
import { orderAndFilter } from "../../redux/actions/actions";
import CustomCarousel from "../../Components/Carousel/CustomCarousel";
import "./HomePage.css";
import { SocialIcon } from "react-social-icons";
import { Box, Flex, Grid, GridItem, Img } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import { Divider } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Image, Stack, Heading, Text, Button } from "@chakra-ui/react";

function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [filterByType, setFilterByType] = useState("");
  const [sort, setSort] = useState("");
  // const [sortByPrice, setSortByPrice] = useState("");

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

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
    <div className={style.body}>
      <Divider />
      <h1 className={style.h1}>The best vegan food in town!</h1>
      {/* Filter By Type:{" "}
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
      </select> */}
      {/* Order By Price:{" "}
      <select value={sortByPrice} onChange={handleSortByPrice}>
        <option value=""></option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select> */}
      {/* <Products products={currentItems} /> */}
      {/* <Pagination
        goToPrevPage={() => setCurrentPage(currentPage - 1)}
        goToNextPage={() => setCurrentPage(currentPage + 1)}
        goToPage={(page) => setCurrentPage(page)}
        currentPage={currentPage}
        lastPage={totalPages}
      /> */}
      <Divider />
      <CustomCarousel />
      <div>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Image
            position={"absolute"}
            left={40}
            objectFit="cover"
            maxW={{ base: "100%", sm: "330px" }}
            src="https://mdpiblog.wordpress.sciforum.net/wp-content/uploads/sites/4/2021/11/vegan-4187877_1280.jpeg"
            alt="Caffe Latte"
          />

          <Stack>
            <CardBody>
              <Heading size="md">Welcome to your Vegan World!</Heading>

              <Text py="2">
                {" "}
                We hope you can find what you need here, take a look to our
                products and start shopping by clicking the button below.
              </Text>
            </CardBody>

            <CardFooter>
              <Button
                variant="solid"
                colorScheme="teal"
                margin={"auto"}
                marginTop={-4}
              >
                Let's start
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      </div>
      <footer class="footer-distributed">
        <div class="footer-left">
          <h3>
            <span>Vegan</span>World
          </h3>

          <p class="footer-links">
            <a href="#" class="link-1">
              Home
            </a>

            <a href="#">Blog</a>

            <a href="#">Pricing</a>

            <a href="#">About</a>

            <a href="#">Faq</a>

            <a href="#">Contact</a>
          </p>

          <p class="footer-company-name">VeganWorld © 2023</p>
        </div>

        <div class="footer-center">
          <div>
            <i class="fa fa-map-marker"></i>
            <p>
              <span>Av. Rivadavia 9423</span> Capital Federal, Buenos Aires
            </p>
          </div>

          <div>
            <i class="fa fa-phone"></i>
            <PhoneIcon marginRight="1em"></PhoneIcon>
            <p>+54 9 1122309876</p>
          </div>

          <div>
            <i class="fa fa-envelope"></i>
            <p>
              <a href="mailto:support@company.com">veganworld@gmail.com</a>
            </p>
          </div>
        </div>

        <div class="footer-right">
          <p class="footer-company-about">
            <span>About the company</span>
            Making it easier to be Vegan and order food!
          </p>

          <div class="footer-icons">
            <a href="#">
              <SocialIcon
                url="https://facebook.com/VeganWorld"
                style={{ height: 30, width: 30 }}
              />
            </a>
            <a href="#">
              <SocialIcon
                url="https://twitter.com/VeganWorld"
                style={{ height: 30, width: 30 }}
              />
            </a>
            <a href="#">
              <SocialIcon
                url="https://github.com/LucianoCygler/VeganWorld"
                style={{ height: 30, width: 30 }}
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
