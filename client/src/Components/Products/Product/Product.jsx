import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Product.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createFavoriteAction,
  deleteFavoriteAction,
  getClientAllFavorites,
} from "../../../redux/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import "aos/dist/aos.css";
import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { addCartProduct, getProductById } from "../../../redux/actions/actions";
import Pop_up from "../../../Utils/Pop_up/Pop_up";

function Product({ nombre, imagen, precio, stock, descripcion, id }) {
  const [isFav, setIsFav] = useState(false);
  const [showInfo, setShowInfo] = useState(true); /* INFO */
  // const product = { nombre, imagen, precio, stock, descripcion, id };
  const { user, favorites } = useSelector((state) => state);
  const [product] = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const product_id = id;
  const client_id = user.id;
  const email = localStorage.getItem("email");
  const [loading, setLoading] = useState(false);
  const quantity = 1;

  useEffect(() => {
    for (const item of favorites) {
      console.log(item.Product.id);
      if (id == item.Product.id) setIsFav(true);
    }
  }, []);

  const handleClick = () => {
    dispatch(getProductById(id))
      .then(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 800);
        return dispatch(addCartProduct(product, quantity));
      })
      .then(() => {
        Pop_up(
          "success",
          "Product added",
          "You can find your products in Cart!",
          "top"
        );
      })
      .catch(({ message }) => {
        Pop_up("info", "Product added", message, "top");
      });
  };

  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
      if (product_id) {
        dispatch(deleteFavoriteAction(product_id));
      } else {
        console.error("error");
      }
    } else {
      setIsFav(true);
      if (client_id) {
        dispatch(createFavoriteAction({ client_id, product_id }));
      } else {
        console.error("Invalid client ID");
      }
    }
  };

  return (
    <Box>
      <div>
        {email ? (
          <Box>
            {!isFav ? (
              <Box position={"relative"} left={"5.5em"} top={"-20px"}>
                {/* <FontAwesomeIcon onClick={handleFavorite} icon={farHeart} /> */}
                <Box onClick={handleFavorite} _hover={{ cursor: "pointer" }}>
                  🤍
                </Box>
              </Box>
            ) : (
              <Box position={"relative"} left={"5.5em"} top={"-20px"}>
                {/* <FontAwesomeIcon onClick={handleFavorite} icon={fasHeart} /> */}
                <Box onClick={handleFavorite} _hover={{ cursor: "pointer" }}>
                  💗
                </Box>
              </Box>
            )}
          </Box>
        ) : (
          ""
        )}
        <Box>
          <Flex>
            <NavLink to={`/Detail/${id}`} style={{ textDecoration: "none" }}>
              <Grid templateRows={"repeat(3,80px)"}>
                {" "}
                <Box marginLeft="1em" marginRight="1em">
                  <Image src={imagen} alt={nombre} w="100%" />
                </Box>
                <Grid templateRows={"repeat(3,30px)"} marginTop={"6em"}>
                  {" "}
                  <Box>
                    <Text
                      fontWeight={"bold"}

                      // fontSize={nombre.split("\n").length > 1 ? "10px" : "15px"}
                    >
                      {nombre}
                    </Text>
                  </Box>
                  <Box marginTop={"1em"}>
                    <Text>${parseInt(precio)}</Text>
                  </Box>
                </Grid>
              </Grid>
            </NavLink>
          </Flex>
          <Box marginTop={"1em"}>
            {" "}
            <Button
              variant="solid"
              colorScheme="teal"
              onClick={handleClick}
              isLoading={loading}
            >
              Add to cart
            </Button>
          </Box>
        </Box>
      </div>
    </Box>
  );
}

export default Product;
