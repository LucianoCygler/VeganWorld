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
import { NavLink } from "react-router-dom";
import { Box, Flex, Grid, GridItem, Img } from "@chakra-ui/react";
import { Button, IconButton } from "@chakra-ui/react";
import { Text, Heading, Link, Image } from "@chakra-ui/react";
import { Input, Textarea, Select } from "@chakra-ui/react";
import { Checkbox, Radio, Switch } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Stack, VStack, HStack } from "@chakra-ui/react";
import { Spacer, Divider } from "@chakra-ui/react";
import { Avatar, Badge, Tag } from "@chakra-ui/react";
import { Progress, Spinner, Skeleton } from "@chakra-ui/react";
import { Alert, CloseButton } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Pagination } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import {
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import "./Detail.css";
function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product] = useSelector((state) => state.product);
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
      Pop_up("success", "Product added", "You can find your products in Cart!");
    } catch ({ message }) {
      Pop_up("info", "Product added", message);
    }
  };

  const handleDecrement = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  const handleIncrement = () => {
    if (quantity < 100) {
      setQuantity(quantity + 1);
    }
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Box minWidth="100%" minHeight="100vh" bg="white" paddingTop="10em">
      {product?.nombre ? (
        <>
          <Box bg="white">
            <Grid
              bg="white"
              margin="auto"
              height="80vh"
              position="relative"
              templateRows="repeat(2, 0.1fr)"
              justify="center"
              align="center"
              boxShadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
              maxWidth="80%"
            >
              <Box marginTop="2em">
                {" "}
                <h1>{product.nombre}</h1>
              </Box>
              <Flex
                direction="row"
                margin="auto"
                bg="white"
                justify="center"
                align="center"
                paddingBottom="4em"
                maxWidth="fit-content"

                // Configuración de la sombra
              >
                <Button
                  colorScheme="teal"
                  size="xs"
                  onClick={handleGoBack}
                  position="absolute"
                  left="10px"
                  top="10px"
                  zIndex="1"
                >
                  <FontAwesomeIcon icon={faArrowLeftLong} />
                </Button>
                <Box
                  minWidth="500px"
                  minheigth="500px"
                  bg="white"
                  margin="3em"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Img
                    src={product.imagen}
                    alt={product.nombre}
                    borderRadius="full"
                    shadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
                    width="100%"
                  />
                </Box>
                <Box
                  marginTop="5em"
                  marginLeft="4em"
                  bg="white"
                  marginRight="2em"
                >
                  {" "}
                  <Grid
                    gridTemplateRows="3"
                    gap="20"
                    paddingTop="8em"
                    minWidth="500px"
                    minheigth="500px"
                  >
                    <p>
                      {product.descripcion}Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Donec vel egestas dolor, nec
                      dignissim metus. Donec augue elit, rhoncus ac sodales id,
                      porttitor vitae est. Donec laoreet rutrum libero sed
                      pharetra. Donec vel egestas dolor, nec dignissim metus.
                      Donec augue elit, rhoncus ac sodales id, porttitor vitae
                      est. Donec laoreet rutrum libero sed pharetra. Duis a arcu
                      convallis, gravida purus eget, mollis diam.
                    </p>

                    <h1>${product.precio}</h1>
                    <p>Cantidad: {quantity}</p>
                  </Grid>
                  <Button onClick={handleDecrement} marginRight="1em">
                    -
                  </Button>
                  <Button onClick={handleIncrement} marginRight="1em">
                    +
                  </Button>
                  <Button
                    isLoading={loading}
                    colorScheme="teal"
                    onClick={handleClick}
                  >
                    Add To Cart
                  </Button>
                </Box>
              </Flex>
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
      <Box
        w="80%"
        bg="white  "
        paddingTop="2em"
        margin="auto"
        shadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
      >
        {productReviews
          ? productReviews.slice(0, 3).map((review) => {
              return (
                <>
                  <Box display="inline-block" marginRight="1.5em">
                    <div class="cardReview">
                      <div class="header">
                        <div class="image"></div>
                        <div>
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
                          <p class="name">{review.cliente_nombre}</p>
                          <p>{review.titulo}</p>
                        </div>
                      </div>

                      <p class="message">{review.descripcion}</p>
                      <small class="message">{review.fecha}</small>
                    </div>
                  </Box>
                </>
              );
            })
          : ""}
      </Box>
    </Box>
  );
}
export default Detail;
