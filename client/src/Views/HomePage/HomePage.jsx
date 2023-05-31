import React, { useEffect, useState } from "react";
import style from "./HomePage.module.css";
import {
  getAllPageReviews,
  getAllProducts,
  getAllReviews,
  getClientData,
  getClientReviews,
  getUserDataByEmail,
} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Products } from "../../Components/index";
import { orderAndFilter } from "../../redux/actions/actions";
import CustomCarousel from "../../Components/Carousel/CustomCarousel";
import Carrusel from "../../Components/Carousel/Carrusel";
import "./HomePage.css";
import { SocialIcon } from "react-social-icons";
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Grid,
  GridItem,
  Img,
  StylesProvider,
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import { Divider } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Image, Stack, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { shuffle } from "lodash";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ModalLogin from "../Login/ModalLogin";

const images = [
  "https://res.cloudinary.com/da6d9ru3s/image/upload/v1685073896/Fresh_and_healthy_vegetables_banner_design_template_uetvqo.jpg",
  "https://res.cloudinary.com/da6d9ru3s/image/upload/v1685074181/asdasda_zbypd9.png",
];

const MySlider = () => {
  const [slidesToShow, setSlidesToShow] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Ajusta el valor según tus necesidades
        setSlidesToShow(1);
      } else {
        setSlidesToShow(2);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Asegura que la configuración inicial sea correcta

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000, // Tiempo de espera entre imágenes (en milisegundos)
    speed: 900, // Velocidad de transición entre imágenes (en milisegundos)
    slidesToShow: 1, // Número de imágenes a mostrar al mismo tiempo
    slidesToScroll: 1, // Número de imágenes a desplazar al avanzar o retroceder
  };
  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <Box>
            <Image
              shadow="2px 2px 4px rgba(0, 0, 0, 1)"
              color={"white"}
              w={"100%"}
              maxH="95vh"
              src={image}
              alt={`Slide ${index + 1}`}
              // style={{ opacity: 0.7 }}
            />{" "}
          </Box>
        </div>
      ))}
    </Slider>
  );
};

function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const pageReviews = useSelector((state) => state.pageReviews);
  const [filterByType, setFilterByType] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();
  const shuffledReviews = shuffle(pageReviews);
  const randomReviews = shuffledReviews.slice(0, 3);
  const user = useSelector((state) => state.user);

  const location = useLocation();
  const showLogin = (location.state && location.state.showLogin) || false;
  const email = localStorage.getItem("email");
  useEffect(() => {
    dispatch(getUserDataByEmail(email));
  }, [email]);

  useEffect(() => {
    dispatch(getAllPageReviews());
  }, []);

  useEffect(() => {
    AOS.init(); // Inicializa AOS
  }, []); //#d8d8d8
  return (
    <Box
      overflow={"hidden"}
      marginRight={0}
      maxW={"100%"}
      vh={100}
      scrollBehavior={"smooth"}
      paddingTop={90}
      margin={0}
      backgroundImage={"https://wallpaperaccess.com/full/1812875.jpg"}
      bgSize={"cover"}
      bgRepeat={"no-repeat"}
    >
      {showLogin && (
        <Alert status="warning" paddingTop={"2em"}>
          <AlertIcon marginBottom={"1em"} />
          <Text>
            You cannot access this functionality because you are not logged in.
            You can view our products in the "Our Products" tab.
          </Text>
        </Alert>
      )}
      {/* <ModalLogin show={showLogin}></ModalLogin> */}
      <Box>
        {" "}
        <MySlider />
        <Box paddingTop={"2em"} marginBottom={"2em"}>
          <Flex direction={"row"} justify={"center"}>
            {/* <Box width={"80%"} height="700" bg="#d8d8d8">
            <Image
              
              maxW={{ base: "100%", sm: "330px" }}
              src="https://media.istockphoto.com/id/1175556888/es/vector/logotipo-vegano-verde-se%C3%B1al-de-alimentos-saludables-eco-bio-etiqueta-para-caf%C3%A9-envases-y.jpg?s=612x612&w=0&k=20&c=G8BRmESnPo87iu8j0YyYN3DedWQ8iiXVPLLSLLl0OxQ="
            ></Image>
          </Box> */}

            <Text fontSize="6xl">
              <h1 className={style.h1}>The best vegan food in town!</h1>
            </Text>
          </Flex>
        </Box>
        <div
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          data-aos-duration="2000"
        >
          <Card
            direction={{ base: "column", sm: "row" }}
            justifyContent={"center"}
            alignContent={"center"}
            height={400}
            bg="none"
          >
            <Stack justifyContent={"center"}>
              <CardBody>
                <Heading
                  size="md"
                  fontSize="5xl"
                  marginTop={30}
                  color="white"
                  textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
                >
                  <Text> Welcome to your Vegan World!</Text>
                </Heading>
                <Box wordBreak="break-word" justify={"center"}>
                  <Text
                    marginTop={10}
                    py="2"
                    fontSize="3xl"
                    color="white"
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
                  >
                    We hope you can find what you need here, take a look to our
                    products and start shopping by clicking the button below.
                  </Text>
                </Box>
              </CardBody>

              <CardFooter>
                <Button
                  shadow="2px 2px 4px rgba(0, 0, 0, 1)"
                  w={"200px"}
                  h={"70px"}
                  variant="solid"
                  colorScheme="teal"
                  margin={"auto"}
                  marginTop={-4}
                  marginBottom={20}
                  onClick={() => {
                    navigate("/ourproducts");
                  }}
                >
                  <Text fontSize={"3xl"} margin={"10px"}>
                    Let's start
                  </Text>
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        </div>
      </Box>
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
      {/* <Carrusel /> */}
      <Box marginTop={200} w={"fit-content"} margin="3em auto ">
        <Text
          as="b"
          fontSize="6xl"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
          color="white"
          padding={"0.3em"}
          borderRadius={70}
        >
          <span>Best Products</span>
        </Text>
      </Box>
      <CustomCarousel />
      <Box
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="1400"
        marginTop={60}
        marginBottom={180}
      >
        <Text
          as={"b"}
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
          color="white"
        >
          <h1>Our custommers</h1>
        </Text>{" "}
        <>
          <Flex
            flexDirection={"row"}
            justifyContent={"center"}
            marginLeft={"1em"}
          >
            {pageReviews
              ? randomReviews.map((review) => (
                  <Card
                    marginRight="2em"
                    marginTop={"2em"}
                    padding={"2em"}
                    minWidth={"10%"}
                    width={{ base: "30%", md: "30%", lg: "30%", xl: "20%" }}
                    overflow={"hidden"}
                  >
                    <Grid templateColumns={"repeat(2,1fr)"}>
                      <Box
                        marginBottom={"2em"}
                        display="flex"
                        justifyContent={"left"}
                      >
                        <Avatar src={review.cliente_imagen} size="xl" />
                      </Box>
                      <Box>
                        {" "}
                        <Box display={"flex"} justifyContent={"center"}>
                          <Text fontWeight={"semibold"} color={"#3eb86b"}>
                            {review.cliente_nombre}
                          </Text>
                        </Box>
                        <Box display={"flex"} justifyContent={"center"}>
                          <Text fontWeight={"extrabold"}>{review.titulo}</Text>
                        </Box>
                        <Box display={"flex"} justifyContent={"center"}>
                          <Text
                            fontSize={"14px"}
                            whiteSpace="pre-wrap"
                            wordWrap="break-word"
                          >
                            {review.descripcion}
                          </Text>{" "}
                        </Box>
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          position={"absolute"}
                          right="1em"
                          bottom={"0.5em"}
                        >
                          <Text color="grey" fontSize={"10px"}>
                            {review.fecha}
                          </Text>
                        </Box>
                      </Box>
                    </Grid>
                  </Card>
                ))
              : ""}
          </Flex>
        </>
      </Box>
      <Box overflowWrap={"wrap"}></Box>
      <div data-aos="fade-left" data-aos-duration="3000">
        <Grid
          marginLeft={"5em"}
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
            "2xl": "repeat(4, 1fr)",
          }}
          gap={4}
          marginBottom="3em"
        >
          <Box
            bg="white"
            margin="2px"
            borderRadius="120px 20px"
            shadow="2px 2px 4px rgba(0, 0, 0, 1)"
            h={"350px"}
            w={"350px"}
          >
            <Image
              marginTop={"1em"}
              padding="1em"
              marginLeft={20}
              maxW={{ base: "100%", sm: "200px" }}
              src="https://static.vecteezy.com/system/resources/previews/004/542/032/non_2x/young-woman-sitting-on-floor-working-with-laptop-cartoon-style-illustration-isolated-on-white-background-vector.jpg"
            />
            <Text fontSize="2xl" marginTop={15} fontWeight="bold">
              Order Online
            </Text>
          </Box>
          <Box
            bg="white"
            margin="2px"
            borderRadius="120px 20px"
            shadow="2px 2px 4px rgba(0, 0, 0, 1)"
            h={"350px"}
            w={"350px"}
          >
            <Image
              marginTop={"1em"}
              padding="1em"
              marginLeft={20}
              paddingTop={5}
              maxW={{ base: "100%", sm: "200px" }}
              src="https://img.freepik.com/vector-gratis/hombre-montando-scooter-sobre-fondo-blanco_1308-46379.jpg"
            />
            <Text fontSize="2xl" marginTop={4} fontWeight="bold">
              Fast Shipping
            </Text>
          </Box>
          <Box
            h={"350px"}
            w={"350px"}
            bg="white"
            margin="2px"
            borderRadius="120px 20px"
            shadow="2px 2px 4px rgba(0, 0, 0, 1)"
          >
            <Image
              padding="2em"
              marginLeft={19.5}
              maxW={{ base: "100%", sm: "300px" }}
              src="https://media.istockphoto.com/id/1152445566/es/vector/el-repartidor-est%C3%A1-sosteniendo-una-caja-de-paquetes.jpg?s=612x612&w=0&k=20&c=cUSmSP-hnxJSOTnGoNxstqDh9UGZyM2zE0OEebXt_UE="
            />
            <Text fontSize="2xl" marginTop={-5} fontWeight="bold">
              Receive your order
            </Text>
          </Box>
          <Box
            h={"350px"}
            w={"350px"}
            bg="white"
            margin="2px"
            borderRadius="120px 20px"
            shadow="2px 2px 4px rgba(0, 0, 0, 1)"
          >
            <Image
              padding="2em"
              marginLeft={19.5}
              maxW={{ base: "100%", sm: "300px" }}
              src="https://media.istockphoto.com/id/1282103104/es/vector/ni%C3%B1a-comiendo-frutas-alimentos-saludables-mujer-aislada-en-dibujos-animados-planos-la.jpg?s=170667a&w=0&k=20&c=HpUGp0dItcE_lAzyYKe70xrm5xc0NnzyiGWy8el5Q4A="
            />
            <Text fontSize="2xl" marginTop={-5} fontWeight="bold">
              Enjoy!
            </Text>
          </Box>
        </Grid>
      </div>
      <footer class="footer-distributed">
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(1, 100%)",
            md: "repeat(2, 50%)",
            lg: "repeat(3, 42%)",
            xl: "repeat(3, 42%)",
          }}
        >
          <div class="footer-left">
            <h3 className={style.h1footer}>
              <span>Vegan</span>World
            </h3>

            <p class="footer-links">
              <a href="#" class="link-1">
                Home
              </a>

              <a href="/About">About</a>

              <a href="/ContactUs">Contact</a>
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

            <div className={style.divPhone}>
              {/* <i class="fa fa-phone"></i> */}
              <PhoneIcon marginRight="1em"></PhoneIcon>
              <p className={style.phone}>+54 9 1122309876</p>
            </div>

            <div>
              <i class="fa fa-envelope"></i>
              <p>
                <a href="mailto:support@company.com">veganworld36@gmail.com</a>
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
        </Grid>
      </footer>
    </Box>
  );
}

export default HomePage;
