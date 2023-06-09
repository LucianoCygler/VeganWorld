import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientReviews,
  deleteReview,
  getUserDataByEmail,
} from "../../redux/actions/actions";
import ReviewDetail from "../../Components/ReviewDetail/ReviewDetail";
import styles from "./MyReviews.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import LoginForm from "../Login/LoginForm";
import {
  Box,
  Flex,
  Grid,
  Image,
  GridItem,
  Heading,
  Img,
  Text,
} from "@chakra-ui/react";
import "./MyReviews.css";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";

const MyReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reviews = useSelector((state) => state.reviews);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const user = useSelector((state) => state.user);

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  useEffect(() => {
    const emailCurrent = localStorage.getItem("email");
    if (emailCurrent) {
      dispatch(getUserDataByEmail(emailCurrent));
    }
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getClientReviews(user.id));
    }
  }, [user, selectedReview]);

  const showPopupHandler = (review) => {
    setSelectedReview(review);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedReview(null);
    setIsPopupOpen(false);
  };

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId));
    alert("Review deleted");
  };

  return (
    <Box
      marginTop={"0"}
      minH="100vh"
      backgroundImage={"https://wallpaperaccess.com/full/1812875.jpg"}
      paddingBottom={"10em"}
    >
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
            Hey, I see that you are trying to access your Reviews, but to do so,
            you must first be logged in.
          </h2>
          <Button variant="primary" onClick={handleShowModal}>
            Click here to log in!{" "}
          </Button>
        </div>
      ) : (
        <>
          <Divider />
          <Box marginTop={"9em"} display={"flex"} justifyContent={"center"}>
            <Text
              fontSize={"30px"}
              color="white"
              textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
              position="relative"
            >
              REVIEWS
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
          <Box
            paddingTop={10}
            minH="80vh"
            w="80%"            
            margin="auto"
            shadow="0px 4px 1000px rgba(0, 0, 0, 0.2)"
            // bg={"rgba(216, 216, 216, 0.5)"}
            marginTop={"4em"}
            borderRadius={"35px"}
          >
            <Box display="flex" justifyContent={"center"}>
              {reviews.length > 0 ? (
                reviews.map((review) => {
                  return (
                    <>
                      <Box marginRight="1.5em">
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
                          onClick={() => showPopupHandler(review)}
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
                                <Text
                                  fontSize={"15px"}
                                  wordBreak={"break-word"}
                                >
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
              ) : (
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} >
                  <Heading m={"2em 0em"} color={"white"} fontSize={"5xl"} textShadow={"7px 3px 3px rgba(45,45,45,0.65)"}>You dont have reviews yet...</Heading>
                  <Text color="white" fontSize="5xl" >
                    Click <NavLink to="/ourproducts" style={{ color: 'yellow' }}>here</NavLink> to see our products</Text>
                  
                  <Image
                    src="https://res.cloudinary.com/da6d9ru3s/image/upload/v1685459046/favorite-154758_1280_jruydu.png"
                    className="img-fluid"
                    style={{ width: "200px", height: "auto" }}
                    alt="Imagen"
                    mt={"5em"}
                  ></Image>
                </Box>
              )}
            </Box>
          </Box>
          {/* // reviews.map((review) => (
            //   <div
            //     key={review.id}
            //     className={styles.reviewcard}
            //     onClick={() => showPopupHandler(review)}
            //   >
            //     <div className={styles.cardcontent}>
            //       <h2 className={styles.cardtitle}>{review.titulo}</h2>
            //     </div>
            //   </div>
          //   // )) */}
          {/* // ) : (
            
          // )} */}
          {isPopupOpen && (
            <>
              {/* <div className={styles.overlay} onClick={closePopup} /> */}
              <Box>
                <ReviewDetail
                  review={selectedReview}
                  closePopup={closePopup}
                  handleDeleteReview={handleDeleteReview}
                />
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default MyReviews;
