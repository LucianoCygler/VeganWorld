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
  }, [user]);

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
            Oye, veo que estas intentando acceder a tus Reviews, pero para
            hacerlo primero debes estar logueado.
          </h2>
          <Button variant="primary" onClick={handleShowModal}>
            Haz click aqui para loguearte.
          </Button>
        </div>
      ) : (
        <div className={styles.reviewscontainer}>
          <h1>REVIEWS</h1>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className={styles.reviewcard}
                onClick={() => showPopupHandler(review)}
              >
                <div className={styles.cardcontent}>
                  <h2 className={styles.cardtitle}>{review.titulo}</h2>
                </div>
              </div>
            ))
          ) : (
            <div>
              <h2>You have no reviews yet.</h2>
              <h3>Let's make one...</h3>
            </div>
          )}

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
        </div>
      )}
    </div>
  );
};

export default MyReviews;
