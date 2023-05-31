import React, { useEffect, useState } from "react";
import { Ring } from "@uiball/loaders";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  cleanDetail,
  addCartProduct,
  getProductReviews,
} from "../../redux/actions/actions";
import Pop_up from "../../Utils/Pop_up/Pop_up";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Flex, Grid, GridItem, Img } from "@chakra-ui/react";
import { Button, IconButton } from "@chakra-ui/react";
import { Text, Heading, Link, Image } from "@chakra-ui/react";
import { Avatar, Badge, Tag } from "@chakra-ui/react";
import "./Detail.css";
import CreateReview from "./createReview";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userON = localStorage.getItem("email");

  const [product] = useSelector((state) => state.product);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const productReviews = useSelector((state) => state.productReviews);

  const [quantity, setQuantity] = useState(1);
  const product_id = id;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getProductById(id));
    return () => dispatch(cleanDetail());
  }, [dispatch, id]);
  useEffect(() => {
    if (product_id) {
      dispatch(getProductReviews(product_id));
    }
  }, [product_id]);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
    try {
      dispatch(addCartProduct(product, quantity));
      localStorage.setItem("carrito", JSON.stringify(cart));
      Pop_up("success", "Product added", "You can find your products in Cart!");
    } catch ({ message }) {
      Pop_up("info", "Product added", message);
    }
  };

  const handleDecrement = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  const handleIncrement = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Box
      backgroundImage={"https://wallpaperaccess.com/full/1812875.jpg"}
      bgSize={"cover"}
      bgRepeat={"no-repeat"}
      minH={"100vh"}
      paddingTop={"8em"}
      minWidth={"100%"}
      overflow={"hidden"}
    >
      {product?.nombre ? (
        <>
          <Box>
            <Grid
              margin="auto"
              position="relative"
              templateColumns="repeat(2, 1fr)"
              justify="center"
              align="center"
              maxWidth="80%"
            >
              <Box>
                <Button
                  colorScheme="teal"
                  size="xs"
                  onClick={handleGoBack}
                  position="absolute"
                  left="370px"
                  top="20px"
                  zIndex="1"
                  h={"50px"}
                  w={"50px"}
                >
                  <FontAwesomeIcon icon={faArrowLeftLong} />{" "}
                </Button>{" "}
                <Box
                  width="60%"
                  margin="3em"
                  marginTop={"9em"}
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Img
                    src={product.imagen}
                    alt={product.nombre}
                    borderRadius={"10px"}
                    shadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
                    width="100%"
                  />
                </Box>
              </Box>
              <Box
                marginTop="5em"
                marginLeft="4em"
                marginRight="2em"
                boxShadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
                padding={"3em"}
                paddingTop={0}
                height={"fit-content"}
              >
                {" "}
                <Grid gridTemplateRows="3" gap="10" paddingTop="8em">
                  <Heading
                    fontSize="4xl"
                    color="white"
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
                  >
                    {product.nombre}
                  </Heading>
                  <hr></hr>
                  <Text
                    fontSize="1xl"
                    color="white"
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
                  >
                    {product.descripcion}
                  </Text>
                  <hr></hr>
                  <Text
                    fontSize="3xl"
                    color="white"
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
                  >
                    ${product.precio}
                  </Text>
                  <Text
                    fontSize={"2xl"}
                    color="white"
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
                  >
                    Quantity: {quantity}
                  </Text>
                </Grid>
                <Button
                  onClick={handleDecrement}
                  marginRight="0.5em"
                  fontSize={"3xl"}
                  width={"40px"}
                  _hover={{
                    color: "white",
                    backgroundColor: "red",
                    transition: "color 0.3s ease, text-shadow 0.3s ease",
                    textShadow: "1px 2px 11px #EEEEEE",
                    cursor: "pointer",
                  }}
                >
                  -
                </Button>
                <Button
                  onClick={handleIncrement}
                  marginRight="1em"
                  fontSize={"2xl"}
                  width={"40px"}
                  _hover={{
                    color: "white",
                    backgroundColor: "green",
                    transition: "color 0.3s ease, text-shadow 0.3s ease",
                    textShadow: "1px 2px 11px #EEEEEE",
                    cursor: "pointer",
                  }}
                >
                  +
                </Button>
                <Button
                  isLoading={loading}
                  colorScheme="teal"
                  onClick={handleClick}
                  mr={"0.5em"}
                >
                  Add To Cart
                </Button>
                {userON ? (
                  <CreateReview product_id={product_id} cliente_id={user.id} />
                ) : (
                  ""
                )}
              </Box>
            </Grid>
          </Box>
        </>
      ) : (
        <Ring
          size={200}
          lineWeight={5}
          speed={2}
          color="rgba(29, 103, 88, 0.6)"
        />
      )}

      <Box paddingTop={"4em"}>
        <hr></hr>
        <Box display={"flex"} justifyContent={"center"} paddingTop={"2em"}>
          {" "}
          <Heading
            fontSize="3xl"
            color="white"
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
          >
            Product Reviews
          </Heading>
        </Box>
        <Box display="flex" justifyContent={"center"}>
          {productReviews
            ? productReviews.slice(0, 3).map((review) => {
                return (
                  <>
                    <Box display="inline-block" marginRight="1.5em">
                      <Box
                        bg="rgba(243, 244, 246, 1);"
                        padding={"2em"}
                        borderRadius={"10px"}
                        boxShadow={"0 20px 30px -20px rgba(5, 5, 5, 0.24);"}
                        marginBottom={"2em"}
                        w="380px"
                        maxHeight={"300px"}
                        minH={"300px"}
                        mt="2em"
                      >
                        <div class="header">
                          <div>
                            <Avatar
                              src={review.cliente_imagen}
                              size="xl"
                              mr="1em"
                            />
                          </div>
                          <Grid templateRows={5}>
                            <Box>
                              <div class="stars">
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
                            </Box>
                            <Box mt="1em">
                              <p class="name">{review.cliente_nombre}</p>
                            </Box>
                            <Box>
                              <Text fontSize={"15px"}>{review.titulo}</Text>
                            </Box>
                            <Box display={"flex"} justifyContent={"center"}>
                              <Text fontSize={"15px"} wordBreak={"break-word"}>
                                {review.descripcion}
                              </Text>
                            </Box>
                            <Box display={"flex"} justifyContent={"center"}>
                              <Text fontSize={"10px"} color={"grey"}>
                                {review.fecha}
                              </Text>
                            </Box>
                          </Grid>
                        </div>
                      </Box>
                    </Box>
                  </>
                );
              })
            : ""}
        </Box>
      </Box>
    </Box>
  );
}
export default Detail;
