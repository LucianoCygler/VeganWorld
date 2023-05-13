import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientReviews, deleteReview } from "../../redux/actions/actions";
import ReviewDetail from "../../Components/ReviewDetail/ReviewDetail";
import "./MyReviews.css";

const MyReviews = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const clientId = 1;
  // const user = useSelector((state)=>state.user);
  //! Se usa el estado global de los datos del usuario en lugar de la const clientId
  useEffect(() => {
    dispatch(getClientReviews(clientId));
  }, [dispatch]);

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
    window.location.reload();
  };

  return (
    <>
      <h1>Your reviews</h1>
      <div className="reviews-container">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="review-card"
              onClick={() => showPopupHandler(review)}
            >
              <div className="card-content">
                <h2 className="card-title">{review.titulo}</h2>
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
          <div className="overlay" onClick={closePopup} />
          <div className="popup-container">
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
