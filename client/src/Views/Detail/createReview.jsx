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
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createReview, getUserDataByEmail } from "../../redux/actions/actions";

function CreateReview({ product_id, cliente_id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [estrellas, setEstrellas] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  const handleStarClick = (starCount) => {
    setEstrellas(starCount);
  };

  const newReview = {
    titulo: title,
    descripcion: description,
    estrellas,
    product_id,
    cliente_id,
  };

  const handleCreate = () => {
    dispatch(createReview(newReview));
    onClose();
    // window.location.reload();
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
              {" "}
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
            <Box>
              <Box marginBottom={"1em"}>
                <Input
                  placeholder="Review Title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </Box>
              <Box>
                <Input
                  placeholder="Description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
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
