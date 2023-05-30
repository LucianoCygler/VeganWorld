import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faRecycle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanAddress,
  cleanCart,
  createOrder,
  deleteOrder,
  dropProduct,
  getClientData,
  getMercadoPagoLink,
  getUserDataByEmail,
  newCart,
  sendEmail,
} from "../../redux/actions/actions";
import Pop_up from "../../Utils/Pop_up/Pop_up";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import LoginForm from "../Login/LoginForm";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Card,
  CardHeader,
  CardBody,
  Image,
  Flex,
  Button,
  Grid,
  Heading,
} from "@chakra-ui/react";
import AddressPopUp from "./AdressPopUp";
import { DotSpinner, DotWave } from "@uiball/loaders";
import "./Cart.css";
function Cart() {
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => state);
  const address = useSelector((state) => state.address);
  const MPLink = useSelector((state) => state.MPLink);
  const [subTotal, setSubTotal] = useState(0);
  const [updateCart, setUpdateCart] = useState(cart);
  const [isOrderGenerated, setIsOrderGenerated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [addresSetted, setAddressSetted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Variable de estado para el loader

  function products() {
    const idsProductos = [];

    for (let i = 0; i < cart.length; i++) {
      const { id, cantidad } = cart[i];
      for (let j = 0; j < cantidad; j++) {
        idsProductos.push(id);
      }
    }
    return idsProductos;
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  function subTotalF() {
    let subTotalP = 0;
    updateCart?.forEach((product) => (subTotalP += product.importe));
    return subTotalP;
  }

  const dispatch = useDispatch();

  const handleClick = async (event) => {
    const name = event.target.name;
    const id = event.target.value;

    switch (name) {
      case "clear":
        return dispatch(dropProduct(id));
      // case "pay":
      //   return alert("ir al metodo de pago");
      case "generateOrder":
        dispatch(cleanCart());

        var order = {
          cliente_id: user?.id,
          importe: subTotalF(),
          productos: products(),
          direccion: address,
        };

        try {
          setIsLoading(true); // Mostrar loader antes de la redirección
          dispatch(createOrder(order)).then((data) => {
            localStorage.setItem("orderId", data.id);
          });

          Pop_up(
            "success",
            "Order Ceated",
            `You can find your orders in MyOrders!, 
            an E-mail has been sent to your address with the order details.`,
            "top"
          );
          setIsOrderGenerated(true);
          const form = { user, order };
          dispatch(sendEmail(form, "genOrder"));
          dispatch(cleanAddress());
        } catch ({ response }) {
          Pop_up("error", "Failed to Create Order", response.data);
        }
        break;
      case "delete":
        setUpdateCart(updateCart.filter((product) => product.id != id));
        break;
      default:
        return;
    }
  };

  const emailAndProducts = {
    email: localStorage.getItem("email"),
    products: [],
  };

  updateCart.map((product) => {
    return emailAndProducts.products.push({
      title: product.nombre,
      description: product.descripcion,
      picture_url: product.imagen,
      category_id: `category123`,
      quantity: parseInt(product.cantidad),
      unit_price: parseInt(product.precio),
    });
  });
  const email = localStorage.getItem("email");

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    dispatch(getUserDataByEmail(email));
  }, [email]);

  useEffect(() => {
    dispatch(newCart(updateCart));
    setSubTotal(subTotalF());
  }, [updateCart]);

  useEffect(() => {
    if (isOrderGenerated && user?.id) {
      dispatch(getMercadoPagoLink(emailAndProducts));
    }
  }, [isOrderGenerated, user?.id]);

  useEffect(() => {
    if (MPLink) {
      window.location.href = MPLink;
      const timer = setTimeout(() => {
        setIsLoading(false); // Desactiva el loader después de 3 segundos
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [MPLink]);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const payment_id = urlParams.get("payment_id");
    const collectionStatus = urlParams.get("collection_status");

    const storedURL = localStorage.getItem("mpErrorURL");
    const currentURL = window.location.href;

    const orderId = localStorage.getItem("orderId");
    if (payment_id && payment_id === "null" && storedURL !== currentURL) {
      dispatch(deleteOrder(orderId));

      Pop_up("error", "Failed to Create Order");
    }
  }, []);
  {
    /* <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            alignContent={"center"}
            height="100vh" 
            width={"100%"}
          >
            <Box
              marginLeft={"25em"}
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="200px" 
              height="200px" 
              background="rgba(0, 0, 0, 0.5)" 
              borderRadius="8px" 
            >
              <DotWave size={80} speed={0.9} color="white" />{" "}
            </Box>
          </Box> */
  }
  return (
    <Box
      backgroundImage={"https://wallpaperaccess.com/full/1812875.jpg"}
      bgSize={"cover"}
      bgRepeat={"no-repeat"}
      minH={"100vh"}
      display={"flex"}
      justifyContent={"center"}
    >
      {isLoading ? (
        <Box paddingTop={"30em"}>
          <div class="loading">
            <div class="d1"></div>
            <div class="d2"></div>
          </div>{" "}
        </Box>
      ) : (
        <>
          {/* <Box display={"flex"} justifyContent={"left"}>
            <Text
              fontSize={"30px"}
              color="white"
              textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
              position="relative"
            >
              CART
              <Text
                as="span"
                position="absolute"
                left={"1%"}
                bottom={-5} // Ajusta este valor según el espaciado deseado
                width="100%"
                height="3px"
                background="orange"
              />
            </Text>
          </Box> */}
          {cart !== null && updateCart.length > 0 ? (
            <Box w="100%" paddingTop={"10em"}>
              {updateCart.map((product, index) => {
                return (
                  <Box>
                    <Box display={"flex"} justifyContent={"center"}>
                      <Card
                        w={"90%"}
                        borderRadius={0}
                        borderBottom={"1px"}
                        borderColor={"grey"}
                      >
                        <CardBody>
                          <Grid
                            templateColumns={"repeat(6,1fr)"}
                            alignItems={"center"}
                            justifyContent={"space-around"}
                          >
                            {" "}
                            <Box display={"flex"} justifyContent={"center"}>
                              <NavLink
                                to={`/Detail/${product.id}`}
                                style={{ textDecoration: "none" }}
                              >
                                {" "}
                                <Image
                                  h={"150px"}
                                  w={"150px"}
                                  borderRadius={"5px"}
                                  src={product.imagen}
                                />
                              </NavLink>
                            </Box>
                            <Box display={"flex"} justifyContent={"center"}>
                              <NavLink
                                to={`/Detail/${product.id}`}
                                style={{ textDecoration: "none" }}
                              >
                                <Text
                                  fontWeight={"bold"}
                                  fontSize={"2xl"}
                                  marginTop={"1em"}
                                >
                                  {product.nombre}
                                </Text>{" "}
                              </NavLink>
                            </Box>
                            <Box>
                              <Text
                                marginRight={"1em"}
                                display={"inline"}
                                fontSize={"20px"}
                              >
                                Quantity:
                              </Text>
                              <Text
                                display={"inline"}
                                fontWeight={"bold"}
                                fontSize={"25px"}
                              >
                                {product.cantidad}
                              </Text>
                            </Box>
                            <Box>
                              {" "}
                              <Button
                                _hover={{ background: "#822727" }}
                                bg="#F56565"
                                color={"white"}
                                name="decrement"
                                onClick={() => {
                                  const updatedCart = [...updateCart];
                                  if (updatedCart[index].cantidad > 1) {
                                    updatedCart[index].cantidad -= 1;
                                    updatedCart[index].importe =
                                      updatedCart[index].precio *
                                      updatedCart[index].cantidad;
                                  }
                                  setUpdateCart(updatedCart);
                                }}
                              >
                                -
                              </Button>
                              <span>{` `}</span>{" "}
                              <Button
                                colorScheme="teal"
                                name="increment"
                                onClick={() => {
                                  const updatedCart = [...updateCart];
                                  updatedCart[index].cantidad += 1;
                                  updatedCart[index].importe =
                                    updatedCart[index].precio *
                                    updatedCart[index].cantidad;
                                  setUpdateCart(updatedCart);
                                }}
                              >
                                +
                              </Button>
                            </Box>
                            <Box>
                              <Text
                                display="inline"
                                fontSize={"20px"}
                                marginRight={"1em"}
                              >
                                subTotal:
                              </Text>
                              $
                              <Text
                                display="inline"
                                fontWeight={"bold"}
                                fontSize={"25px"}
                              >
                                {product.importe}
                              </Text>{" "}
                            </Box>
                            <Box display={"flex"} justifyContent={"center"}>
                              <Button
                                class="buttonDelete"
                                value={product.id}
                                onClick={handleClick}
                                name="delete"
                              >
                                <svg viewBox="0 0 448 512" class="svgIcona">
                                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                </svg>
                              </Button>
                            </Box>
                          </Grid>
                        </CardBody>
                      </Card>
                    </Box>
                  </Box>
                );
              })}
              <Box display={"flex"} justifyContent={"center"}>
                <Card w={"90%"} borderRadius={"0px"}>
                  <CardBody>
                    <Grid templateColumns={"repeat(2,1fr)"}>
                      {" "}
                      <Box>
                        <>
                          {" "}
                          {email ? (
                            <Box marginBottom={"1em"}>
                              {address == "" ? (
                                <>
                                  {" "}
                                  <InfoOutlineIcon
                                    color={"red"}
                                    marginRight={1.5}
                                  />
                                  <Text display={"inline"} color={"red"}>
                                    Complete your addres first
                                  </Text>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <InfoOutlineIcon
                                    color={"green"}
                                    marginRight={1.5}
                                  />
                                  <Text display={"inline"} color={"green"}>
                                    Once the order is created, you will be
                                    reditected to the payment window.
                                  </Text>
                                </>
                              )}
                            </Box>
                          ) : (
                            ""
                          )}
                          {email ? (
                            <Box>
                              {" "}
                              {address !== "" ? (
                                <>
                                  {!isOrderGenerated ? (
                                    <Button
                                      color={"teal"}
                                      onClick={handleClick}
                                      name="generateOrder"
                                    >
                                      Generate order
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={handleClick}
                                      name="pay"
                                      color={"teal"}
                                    >
                                      Redirecting...
                                    </Button>
                                  )}
                                </>
                              ) : (
                                <AddressPopUp />
                              )}
                            </Box>
                          ) : (
                            ""
                          )}
                        </>
                      </Box>
                      <Box
                        display={"flex"}
                        justifyContent={"right"}
                        marginRight={"3em"}
                      >
                        <Box>
                          {" "}
                          <h2>Order Summary</h2>
                          <Text fontSize={"20px"}>
                            {" "}
                            Total . . . . . . . . . . . . . . . . . . . ${" "}
                            <Text display="inline" fontWeight={"bold"}>
                              {subTotal}
                            </Text>
                          </Text>
                        </Box>
                      </Box>
                    </Grid>
                  </CardBody>
                </Card>{" "}
              </Box>{" "}
            </Box>
          ) : (
            <Box display={"flex"} alignItems={"center"}>
              <Heading color={"white"}>
                There is nothing in your cart...
              </Heading>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default Cart;
