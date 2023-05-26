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
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { addCartProduct, getProductById } from "../../../redux/actions/actions";
import Pop_up from "../../../Utils/Pop_up/Pop_up";
function Product({ nombre, imagen, precio, stock, descripcion, id }) {
  const [isFav, setIsFav] = useState(false);
  const [showInfo, setShowInfo] = useState(false); /* INFO */
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
          "You can find your products in Cart!"
        );
      })
      .catch(({ message }) => {
        Pop_up("info", "Product added", message);
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
      <div
        onMouseOver={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
      >
        {email ? (
          <Box>
            {" "}
            {!isFav ? (
              <div>
                <FontAwesomeIcon onClick={handleFavorite} icon={farHeart} />
              </div>
            ) : (
              <div>
                <FontAwesomeIcon onClick={handleFavorite} icon={fasHeart} />
              </div>
            )}
          </Box>
        ) : (
          ""
        )}
        <Box>
          <Flex flexDirection={"column"}>
            {" "}
            <NavLink to={`/Detail/${id}`} style={{ textDecoration: "none" }}>
              <div>
                <div>
                  {" "}
                  <Box margin="2em">
                    <Image src={imagen} alt={nombre} />
                  </Box>
                  <hr />
                  <Text>{nombre}</Text>
                  {/* <h2 className={styles.subtitle}>{product.descripcion}</h2> */}
                  {showInfo && (
                    <div>
                      <Text>${precio}</Text>
                    </div>
                  )}
                </div>
              </div>
            </NavLink>
            <Button
              marginTop={"0.4em"}
              variant="solid"
              colorScheme="teal"
              onClick={handleClick}
              isLoading={loading}
            >
              Add to cart
            </Button>
          </Flex>
        </Box>
      </div>
    </Box>
  );
}

export default Product;
