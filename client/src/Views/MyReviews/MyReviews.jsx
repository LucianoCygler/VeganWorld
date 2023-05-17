import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientReviews, deleteReview } from "../../redux/actions/actions";
import ReviewDetail from "../../Components/ReviewDetail/ReviewDetail";
import styles from "./MyReviews.module.css";
import { useNavigate } from "react-router-dom";

const MyReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reviews = useSelector((state) => state.reviews);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const clientId = 1;
  // const user = useSelector((state)=>state.user);
  //! Se usa el estado global de los datos del usuario en lugar de la const clientId
  useEffect(() => {
    if (!localStorage.getItem("email")) {
      navigate("/login");
    } else {
      dispatch(getClientReviews(clientId));
    }
  }, [dispatch, selectedReview]);

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
    <>
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
      </div>
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
  );
};

export default MyReviews;
