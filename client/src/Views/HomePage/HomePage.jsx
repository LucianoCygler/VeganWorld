import React, { useEffect, useState } from "react";
import style from "./HomePage.module.css";
import {
  getAllProducts,
  getAllReviews,
  getClientReviews,
} from "../../redux/actions/actions";
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
  "https://images.pexels.com/photos/1893563/pexels-photo-1893563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1590&q=80",
  "https://images.unsplash.com/photo-1541014741259-de529411b96a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  "https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1640769/pexels-photo-1640769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/3669638/pexels-photo-3669638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];
const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000, // Tiempo de espera entre imágenes (en milisegundos)
  speed: 900, // Velocidad de transición entre imágenes (en milisegundos)
  slidesToShow: 2, // Número de imágenes a mostrar al mismo tiempo
  slidesToScroll: 1, // Número de imágenes a desplazar al avanzar o retroceder
};
function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const allReviews = useSelector((state) => state.allReviews);
  const [filterByType, setFilterByType] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();
  const shuffledReviews = shuffle(allReviews);
  const randomReviews = shuffledReviews.slice(0, 4);

  const location = useLocation();
  const showLogin = location.state && location.state.showLogin;

  useEffect(() => {
    dispatch(getAllReviews());
  }, []);

  useEffect(() => {
    AOS.init(); // Inicializa AOS
  }, []); //#d8d8d8
  return (
    <Box
      marginRight={0}
      maxW={"100%"}
      vh={100}
      scrollBehavior={"smooth"}
      paddingTop={200}
      margin={0}
      backgroundImage={
        "https://wallpapercrafter.com/desktop/223806-vegan-vegan-cuisine-veggie-and-vegetarian-hd.jpg"
      }
    >
      <ModalLogin show={showLogin}></ModalLogin>
      <Box>
        <Box paddingTop={1}>
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
          data-aos-duration="1000"
        >
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
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
                  paddingTop={30}
                  color="white"
                  textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
                >
                  <Text> Welcome to your Vegan World!</Text>
                </Heading>
                <Box marginLeft={500} wordBreak="break-word" w={"50%"}>
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
                  <Text fontSize={"3xl"}>Let's start</Text>
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
      <Box marginTop={200} w={"fit-content"} margin="3em auto ">
        <Text
          as="b"
          fontSize="6xl"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
          color="white"
          bg={"rgba(0, 0, 0, 0.2)"}
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
          {allReviews ? (
            randomReviews.map((review) => (
              <Box display="inline-block" marginRight="2em">
                <div className="cardReview">
                  <div className="header">
                    <div>
                      <Avatar
                        name="Ryan Florence"
                        src="https://bit.ly/ryan-florence"
                        size="xl"
                      />
                    </div>
                    <div>
                      <div className="stars">
                        {Array.from({ length: review.estrellas }).map(
                          (_, index) => (
                            <svg
                              key={index}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          )
                        )}
                      </div>
                      <p className="name">{review.cliente_nombre}</p>
                      <p>{review.titulo}</p>
                    </div>
                  </div>
                  <p className="message">{review.descripcion}</p>
                  <small className="message">{review.fecha}</small>
                </div>
              </Box>
            ))
          ) : (
            <p>No hay comentarios disponibles.</p>
          )}
        </>
      </Box>
      <div data-aos="fade-left" data-aos-duration="2000">
        <Box
          width={"100%"}
          height={400}
          bg={"none"}
          padding={1}
          marginBottom={300}
        >
          <Grid
            templateColumns={"repeat(4,1fr)"}
            templateRows={"repeat(2,1fr)"}
          >
            <Box
              bg={"white"}
              margin="2px"
              borderRadius={"120px 20px"}
              shadow="2px 2px 4px rgba(0, 0, 0, 1)"
            >
              <Image
                padding="1em  "
                marginLeft={20}
                maxW={{ base: "100%", sm: "330px" }}
                src="https://static.vecteezy.com/system/resources/previews/004/542/032/non_2x/young-woman-sitting-on-floor-working-with-laptop-cartoon-style-illustration-isolated-on-white-background-vector.jpg"
              ></Image>
              <Text fontSize="4xl" marginTop={"64px"}>
                <Text as="b">Order</Text> Online
              </Text>
            </Box>{" "}
            <Box
              shadow="2px 2px 4px rgba(0, 0, 0, 1)"
              bg={"white"}
              margin="2px"
              borderRadius={"120px 20px"}
            >
              <Image
                padding="1em  "
                marginLeft={20}
                paddingTop={5}
                maxW={{ base: "100%", sm: "330px" }}
                src="https://img.freepik.com/vector-gratis/hombre-montando-scooter-sobre-fondo-blanco_1308-46379.jpg"
              ></Image>
              <Text fontSize="4xl" marginTop={20}>
                <Text as="b">Fast</Text> shipping
              </Text>
            </Box>
            <Box
              shadow="2px 2px 4px rgba(0, 0, 0, 1)"
              bg={"white"}
              margin="2px"
              borderRadius={"120px 20px"}
              paddingLeft={"3em"}
            >
              <Image
                padding="2em  "
                marginLeft={19.5}
                maxW={{ base: "100%", sm: "370px" }}
                src="https://media.istockphoto.com/id/1152445566/es/vector/el-repartidor-est%C3%A1-sosteniendo-una-caja-de-paquetes.jpg?s=612x612&w=0&k=20&c=cUSmSP-hnxJSOTnGoNxstqDh9UGZyM2zE0OEebXt_UE="
              ></Image>{" "}
              <Text fontSize="4xl" marginRight={20} paddingLeft={"1em"}>
                <Text as="b">Receive</Text> the order at the door of your house
              </Text>
            </Box>
            <Box
              shadow="2px 2px 4px rgba(0, 0, 0, 1)"
              bg={"white"}
              margin="2px"
              borderRadius={"120px 20px"}
              paddingLeft={"3em"}
            >
              <Image
                padding="2em"
                marginLeft={19.5}
                maxW={{ base: "100%", sm: "370px" }}
                src="https://media.istockphoto.com/id/1282103104/es/vector/ni%C3%B1a-comiendo-frutas-alimentos-saludables-mujer-aislada-en-dibujos-animados-planos-la.jpg?s=170667a&w=0&k=20&c=HpUGp0dItcE_lAzyYKe70xrm5xc0NnzyiGWy8el5Q4A="
              ></Image>{" "}
              <Text fontSize="4xl" marginRight={20}>
                <Text as="b">Enjoy</Text> your order from Vegan World!
              </Text>
            </Box>
          </Grid>
        </Box>
      </div>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <Box>
              <Image
                shadow="2px 2px 4px rgba(0, 0, 0, 1)"
                color={"white"}
                marginLeft={"2em"}
                w={"95%"}
                h={"65vh"}
                maxH="95vh"
                src={image}
                alt={`Slide ${index + 1}`}
                style={{ opacity: 0.7 }}
              />{" "}
            </Box>
          </div>
        ))}
      </Slider>
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
    </Box>
  );
}

export default HomePage;
