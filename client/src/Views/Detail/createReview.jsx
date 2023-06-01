import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Input,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createReview, getUserDataByEmail } from "../../redux/actions/actions";

function CreateReview({ product_id, cliente_id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [estrellas, setEstrellas] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  const handleStarClick = (starCount) => {
    setEstrellas(starCount);
    validate(newReview)
  };

  const newReview = {
    titulo: title,
    descripcion: description,
    estrellas,
    product_id,
    cliente_id,
  };

  const validate = (newReview) => {
    const error = {};

    if (newReview.titulo.length > 15) {
      error.title = "Cannot exceed 15 characters";
    } else if (newReview.titulo.length === 0) {
      error.title = "Enter title";
    }

    if (newReview.descripcion.length > 30) {
      error.description = "Cannot exceed 30 characters";
    } else if (newReview.descripcion.length === 0) {
      error.description = "Enter description";
    }

    if (newReview.estrellas === null) {
      error.estrellas = "Select a star, please."
    }

    setErrors(error);

    return Object.keys(error).length === 0;
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
    validate(newReview)
    
  };

  const handleReviewTitle = (e) => {
    setTitle(e.target.value);
    validate(newReview)
    
  };
  
  const handleCreate = () => {
    const isValid = validate(newReview);

    if (isValid) {
      dispatch(createReview(newReview));
      onClose();
    }
  };
  
  useEffect(() => {
    if (email) {
      dispatch(getUserDataByEmail(email));
    }
  }, []);

  return (
    <>
      <Button onClick={onOpen}>Review this product</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Leave your review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {Array.from({ length: 5 }, (_, index) => (
                
                <Button
                  key={index}
                  onClick={() => handleStarClick(index + 1)}
                  variant="ghost"
                  size="lg"
                >
                  {index + 1 <= estrellas ? (
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
            </Box>
            {errors.estrellas && (
                  <Text fontSize={"12px"} color={"red"}>{errors.estrellas}</Text>
                )}
            <Box>
              <Box marginBottom={"1em"}>
                <Input
                  placeholder="Review Title"
                  onChange={handleReviewTitle}
                  isInvalid={errors.title}
                />
                {errors.title && (
                  <Text fontSize={"12px"} color={"red"}>{errors.title}</Text>
                )}
              </Box>
              <Box>
                <Input
                  placeholder="Description"
                  onChange={handleDescription}
                  isInvalid={errors.description}
                />
                {errors.description && (
                  <Text fontSize={"12px"} color={"red"}>{errors.description}</Text>
                )}
                
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleCreate}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateReview;