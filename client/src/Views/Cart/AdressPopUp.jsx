import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDataByEmail,
  updateAddress,
  updateClientData,
} from "../../redux/actions/actions";
function AddressPopUp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState();
  const user = useSelector((state) => state.user);
  const email = localStorage.getItem("email");

  useEffect(() => {
    dispatch(getUserDataByEmail(email));
  }, []);

  useEffect(() => {
    if (user) {
      setAddress(user.direccion);
    }
  }, [user]);

  const handleAddAddress = () => {
    // dispatch(updateClientData(user?.id, newData));
    dispatch(updateAddress(address));
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "address") {
      setAddress(value);
    } else if (name === "city") {
      setCity(value);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Complete address</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter your address</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                name="address"
                placeholder="Address.."
                onChange={handleChange}
                value={address}
              />
            </FormControl>

            <FormControl mt={4}>
              {/* <FormLabel>City</FormLabel>
              <Input
                name="city"
                placeholder="City.."
                onChange={handleChange}
                value={city}
              /> */}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddAddress}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default AddressPopUp;
