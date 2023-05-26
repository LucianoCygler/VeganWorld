import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addCartProduct,
  cleanDetail,
  deleteFavoriteAction,
  getProductById,
} from "../../redux/actions/actions";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Pop_up from "../../Utils/Pop_up/Pop_up";
import LoginForm from "../Login/LoginForm";

const CardFav = ({ product, favorites }) => {
  const navigate = useNavigate();

  const quantity = 1;

  const dispatch = useDispatch();

  const [productFav] = useSelector((state) => state.product);

  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    dispatch(getProductById(product?.Product.id))
      .then(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 800);
        return dispatch(addCartProduct(productFav, quantity));
      })
      .then(() => {
        Pop_up(
          "success",
          "Product added",
          "You can find your products in Cart!"
        );
      })
      .catch(({ message }) => {
        Pop_up("info", "Product added", message);
      });
  };
  const handleMP = () => {
    alert(`AGREGAR LA FUNCION DE MERCADO PAGO`);
  };

  useEffect(() => {
    !product && navigate("/");
  }, []);

  return (
    <Card
      maxW="2xs"
      bg={"#d8d8d8"}
      _hover={{
        transform: "scale(1.05)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <Button
        margin={"auto"}
        marginTop={1}
        width={"19%"}
        borderRadius={"50%"}
        bg="rgba(10, 128, 99, 0.35)"
        onClick={() => dispatch(deleteFavoriteAction(product?.Product?.id))}
      >
        <FontAwesomeIcon icon={faHeartCrack} style={{ color: "#c11010" }} />
      </Button>
      <NavLink
        to={`/Detail/${product?.Product?.id}`}
        style={{ textDecoration: "none" }}
      >
        <CardBody>
          <Image
            src={product?.Product?.imagen}
            alt={product?.Product?.nombre}
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{product?.Product?.nombre}</Heading>
            <Text color="blue.600" fontSize="2xl">
              $ {parseInt(product?.Product?.precio)}
            </Text>
          </Stack>
        </CardBody>
      </NavLink>
      <Divider />
      <CardFooter justifyContent={"center"}>
        <ButtonGroup spacing="2" justifyContent={"center"}>
          <Button variant="solid" colorScheme="green" onClick={handleMP}>
            Buy now
          </Button>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={handleClick}
            isLoading={loading}
          >
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default CardFav;
