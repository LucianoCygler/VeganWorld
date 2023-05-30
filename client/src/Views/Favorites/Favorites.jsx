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
import { Box, Heading, Text } from "@chakra-ui/react";
import "./Favorites.css";

import { Wrap, WrapItem } from "@chakra-ui/react";
import CardFav from "./CardFav";

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favorites, deleteFavorite, user, isAuthenticated } = useSelector(
    (state) => state
  );

  const [isFav, setIsFav] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
  }, [user, deleteFavorite]);

  return (
    <>
      <div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Sign in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginForm handleCloseModal={handleCloseModal} />{" "}
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
          <Box
            backgroundImage={"https://wallpaperaccess.com/full/1812875.jpg"}
            minH={"100vh"}
            pt={40}
          >
            <Box
              marginBottom={"3em"}
              display={"flex"}
              justifyContent={"center"}
            >
              <Text
                fontSize={"30px"}
                color="white"
                textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
                position="relative"
              >
                FAVORITES
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
            </Box>
            <Wrap py={5} spacing={"5"} justify={"center"}>
              {favorites && favorites.length > 0 ? (
                favorites?.map((product, index) => {
                  return (
                    <WrapItem shadow={"dark-lg"}>
                      <CardFav product={product} favorites={favorites} />
                    </WrapItem>
                  );
                })
              ) : (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  {" "}
                  <Heading
                    marginBottom={"3em"}
                    color={"whiteAlpha.900"}
                    fontSize="5xl"
                    as="b"
                    textShadow="2px 2px 4px rgba(0, 0, 0,
                    0.5)"
                  >
                    You don't have favorites
                  </Heading>
                  <Image
                    src="https://res.cloudinary.com/da6d9ru3s/image/upload/v1685459046/favorite-154758_1280_jruydu.png"
                    className="img-fluid"
                    style={{ width: "200px", height: "auto" }}
                    alt="Imagen"
                  ></Image>
                </Box>
              )}
            </Wrap>
          </Box>
        )}
      </div>
    </>
  );
};

export default Favorites;
