import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteReview, updateReview } from "../../redux/actions/actions";
import {
  Box,
  Button,
  Input,
  Textarea,
  Flex,
  Text,
  Badge,
} from "@chakra-ui/react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ReviewDetail = ({ review, closePopup }) => {
  const { titulo, descripcion, fecha, id, estrellas } = review;
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTitulo, setEditedTitulo] = useState(titulo);
  const [editedDescripcion, setEditedDescripcion] = useState(descripcion);
  const [editedEstrellas, setEditedEstrellas] = useState(estrellas);

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
      estrellas: editedEstrellas,
    };
    dispatch(updateReview(id, newReview));
    alert("Review updated");
    setEditMode(false);
    closePopup();
  };

  const handleStarClick = (starCount) => {
    setEditedEstrellas(starCount);
  };

  return (
    <Box
      ref={popupRef}
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      background="#f8f8f8"
      padding="20px"
      border="2px solid #ccc"
      borderRadius="10px"
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)"
      zIndex={9999}
    >
      <Button
        position="absolute"
        top="10px"
        right="10px"
        onClick={closePopup}
        variant="ghost"
      >
        X
      </Button>
      {editMode ? (
        <Box marginTop={10}>
          <Flex alignItems="center" marginBottom="10px">
            <Text fontSize="20px" fontWeight="bold" marginRight="5px">
              Estrellas:
            </Text>
            {Array.from({ length: 5 }, (_, index) => (
              <Button
                key={index}
                onClick={() => handleStarClick(index + 1)}
                variant="ghost"
                size="lg"
              >
                {index + 1 <= editedEstrellas ? (
                  <AiFillStar
                    size={24}
                    color="teal"
                    onClick={() => handleStarClick(index + 1)}
                  />
                ) : (
                  <AiOutlineStar
                    size={24}
                    color="gray"
                    onClick={() => handleStarClick(index + 1)}
                  />
                )}
              </Button>
            ))}
          </Flex>
          <Input
            type="text"
            value={editedTitulo}
            onChange={(e) => setEditedTitulo(e.target.value)}
            marginBottom="10px"
          />
          <Textarea
            value={editedDescripcion}
            onChange={(e) => setEditedDescripcion(e.target.value)}
            marginBottom="10px"
          />
          <Button onClick={handleSaveReview} marginBottom="10px">
            Save Review
          </Button>
        </Box>
      ) : (
        <>
          <Flex marginBottom="10px" width={"500px"}>
            <Text fontSize="20px" fontWeight="bold" marginRight="5px">
              Estrellas:
            </Text>
            {Array.from({ length: 5 }, (_, index) => (
              <Box key={index} as="span">
                {index + 1 <= estrellas ? (
                  <AiFillStar size={24} color="teal" />
                ) : (
                  <AiOutlineStar size={24} color="gray" />
                )}
              </Box>
            ))}
          </Flex>
          <Flex marginBottom="10px">
            <Text fontSize="20px" fontWeight="bold" marginRight="5px">
              {titulo}
            </Text>
          </Flex>
          <Flex marginBottom="10px">
            <Text fontSize="20px" fontWeight="bold" marginRight="5px">
              Opinion:
            </Text>
            <Text>{descripcion}</Text>
          </Flex>
          <Flex>
            <Text fontSize="20px" fontWeight="bold" marginRight="5px">
              Date:
            </Text>
            <Text>{fecha}</Text>
          </Flex>
          <Button onClick={handleEditReview} marginRight={"1em"}>
            Edit Review
          </Button>
        </>
      )}
      <Button onClick={handleDeleteReview}>Delete Review</Button>
    </Box>
  );
};

export default ReviewDetail;
