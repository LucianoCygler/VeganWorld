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

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product] = useSelector((state) => state.product);
  const productReviews = useSelector((state) => state.productReviews);

  const [quantity, setQuantity] = useState(1);
  const product_id = id;
  
  // useEffect(() => {
  //   dispatch(getProductById(id));
  //   return () => dispatch(cleanDetail());
  // }, [dispatch, id]);
  
  // useEffect(() => {


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
    <Box w="100%" minHeight="100vh" bg="red" paddingTop="10em">
      {product?.nombre ? (
        <>
          <Box bg="white">
            <Grid
              bg="white"
              w="50%"
              margin="auto"
              height="80vh"
              position="relative"
              templateRows="repeat(2, 0.1fr)"
              justify="center"
              align="center"
              boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
              paddingTop="4em"
            >
              <h1>{product.nombre}</h1>
              <Flex
                direction="row"
                margin="auto"
                bg="purple"
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
                <Box w="500px" bg="blue" margin="3em">
                  <Img
                    src={product.imagen}
                    alt={product.nombre}
                    borderRadius="full"
                  />
                </Box>
                <Box
                  marginTop="5em"
                  marginLeft="4em"
                  bg="orange"
                  marginRight="2em"
                >
                  {" "}
                  <h2>
                    <h1>${product.precio}</h1>
                    <p>{product.descripcion}</p>
                  </h2>
                  <p>Cantidad: {quantity}</p>
                  <Button onClick={handleDecrement}>-</Button>
                  <Button onClick={handleIncrement}>+</Button>
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
      <Box>
        {productReviews
          ? productReviews.slice(0, 3).map((review) => {
              return (
                <>
                  <h1>{review.titulo}</h1>
                  <span>{review.cliente_nombre}</span>
                  <p>{review.descripcion}</p>
                  <p>{review.fecha}</p>
                </>
              );
            })
          : ""}
      </Box>
    </Box>
  );
}
export default Detail;
