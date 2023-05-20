import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteFavoriteAction,
  getClientAllFavorites,
  getUserDataByEmail,
} from "../../redux/actions/actions";
import styles from "./Favorites.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Image, Modal } from "react-bootstrap";
import LoginForm from "../Login/LoginForm";
import { Box, Flex, Grid, GridItem, Img } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { SimpleGrid, Heading, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import "./Favorites.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

const Favorites = () => {
  const [isFav, setIsFav] = useState(false);
  const favorites = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState();
  const [showModal, setShowModal] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false); // Variable de estado adicional

  const email = localStorage.getItem("email");
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleFavorite = (productId) => {
    setIsFav(false);

    dispatch(deleteFavoriteAction(productId));
  };
  useEffect(() => {
    if (email) {
      dispatch(getUserDataByEmail(email));
    }
  }, [email]);

  useEffect(() => {
    if (user) {
      const client_id = user?.id;
      dispatch(getClientAllFavorites(client_id));
    }
  }, [user]);

  return (
    <div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm handleCloseModal={handleCloseModal}></LoginForm>{" "}
        </Modal.Body>
      </Modal>
      {!user ? (
        <div className={styles.divLogin}>
          <h2>
            Hey, I see that you are trying to access your Favorites, but to do
            so, you must first be logged in.
          </h2>
          <Button variant="primary" onClick={handleShowModal}>
            Click here to log in!{" "}
          </Button>
        </div>
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.title}>
            <h1 className={styles.h1}>These are your favorite products ♥</h1>
          </div>
          <Flex marginTop={200}>
            {favorites && favorites.length > 0 ? (
              favorites?.map((favorite) => (
                <>
                  console.log(favorites){" "}
                  <div className={styles.favoriteContainer}>
                    {/* <Box  position={"relative"}> */}
                    {/* <Button
                        colorScheme="teal"
                        onClick={() => {
                          setIsFav(false);
                          dispatch(deleteFavoriteAction(favorite.product_id));
                          setUpdateFlag(true);
                        }}
                      >
                        X
                      </Button> */}
                    {/* </Box> */}
                    <NavLink
                      to={`/Detail/${favorite.product_id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      <Card
                        margin={5}
                        paddingTop={10}
                        maxW={350}
                        maxH={510}
                        _hover={{
                          transform: "scale(1.05)",
                          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.7)",
                        }}
                      >
                        <CardHeader>
                          <Box>
                            <Image
                              style={{ textAlign: "center" }}
                              className={styles.image}
                              src={favorite?.Product.imagen}
                              alt={favorite?.Product.nombre}
                            />
                          </Box>

                          <Heading size="md" marginTop={10}>
                            {favorite?.Product.nombre}
                          </Heading>
                        </CardHeader>
                        <CardBody>
                          <Text>{favorite?.Product.descripcion} </Text>
                          <Text>{favorite?.Product.precio}</Text>
                        </CardBody>
                        <CardFooter></CardFooter>
                      </Card>{" "}
                    </NavLink>{" "}
                  </div>
                </>
              ))
            ) : (
              <h1 className={styles.nofavs}>No hay favoritos</h1>
            )}
          </Flex>
        </div>
      )}
    </div>
  );
};

export default Favorites;
