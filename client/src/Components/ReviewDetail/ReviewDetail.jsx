import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteReview, updateReview } from "../../redux/actions/actions";

const ReviewDetail = ({ review, closePopup }) => {
  const { titulo, descripcion, fecha, id } = review;
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTitulo, setEditedTitulo] = useState(titulo);
  const [editedDescripcion, setEditedDescripcion] = useState(descripcion);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closePopup();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closePopup]);

  const handleDeleteReview = () => {
    dispatch(deleteReview(id));
    alert("Review deleted");
    closePopup();
  };

  const handleEditReview = () => {
    setEditMode(true);
  };

  const handleSaveReview = () => {
    const newReview = {
      titulo: editedTitulo,
      descripcion: editedDescripcion,
    };
    dispatch(updateReview(id, newReview));
    alert("Review updated");
    setEditMode(false);
    closePopup();
  };

  return (
    <div
      ref={popupRef}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#f8f8f8",
        padding: "20px",
        border: "2px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        zIndex: 9999,
      }}
    >
      <button onClick={closePopup}>X</button>
      {editMode ? (
        <>
          <input
            type="text"
            value={editedTitulo}
            onChange={(e) => setEditedTitulo(e.target.value)}
          />
          <textarea
            value={editedDescripcion}
            onChange={(e) => setEditedDescripcion(e.target.value)}
          />
          <button onClick={handleSaveReview}>Save Review</button>
        </>
      ) : (
        <>
          <div style={{ marginBottom: "10px" }}>
            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginRight: "5px",
              }}
            >
              {titulo}
            </span>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}></span>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginRight: "5px",
              }}
            >
              Opinion:
            </span>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              {descripcion}
            </span>
          </div>
          <div>
            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginRight: "5px",
              }}
            >
              Date:
            </span>
            <span>{fecha}</span>
          </div>
          <button onClick={handleEditReview}>Edit Review</button>
        </>
      )}
      <button onClick={handleDeleteReview}>Delete Review</button>
    </div>
  );
};

export default ReviewDetail;
