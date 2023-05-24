import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientReviews,
  deleteReview,
  getUserDataByEmail,
} from "../../redux/actions/actions";
import ReviewDetail from "../../Components/ReviewDetail/ReviewDetail";
import styles from "./MyReviews.module.css";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import LoginForm from "../Login/LoginForm";
import { Box, Flex, Grid, GridItem, Heading, Img } from "@chakra-ui/react";
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
      backgroundImage={
        "https://wallpapercrafter.com/desktop/223806-vegan-vegan-cuisine-veggie-and-vegetarian-hd.jpg"
      }
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

          <Box
            paddingTop={10}
            minH="80vh"
            w="80%"
            bg="#d8d8d8  "
            margin="auto"
            shadow="0px 4px 1000px rgba(0, 0, 0, 0.2)"
            bg={"rgba(216, 216, 216, 0.5)"}
            marginTop={"10em"}
            borderRadius={"35px"}
          >
            <Box>
              <Heading
                fontSize={"80px"}
                color={"white"}
                textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
              >
                Reviews
              </Heading>
            </Box>
            {reviews ? (
              reviews.map((review) => {
                return (
                  <>
                    <Box
                      display="inline-block"
                      marginRight="1.5em"
                      paddingTop="5em"
                      onClick={() => showPopupHandler(review)}
                    >
                      <div class="cardReview">
                        <div class="header">
                          <div>
                            {" "}
                            <Avatar
                              name="Ryan Florence"
                              src="https://bit.ly/ryan-florence"
                              size="xl"
                            />
                          </div>
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
            ) : (
              <div>
                <h2>You have no reviews yet.</h2>
                <h3>Let's make one...</h3>
              </div>
            )}
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
              <div className={styles.overlay} onClick={closePopup} />
              <div className={styles.popupcontainer}>
                <ReviewDetail
                  review={selectedReview}
                  closePopup={closePopup}
                  handleDeleteReview={handleDeleteReview}
                />
              </div>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default MyReviews;
