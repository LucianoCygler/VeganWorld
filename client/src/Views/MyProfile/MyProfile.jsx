import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientData,
  deleteClient,
  updateClientData,
  cleanClient_Id,
  getUserDataByEmail,
} from "../../redux/actions/actions";
import style from "./MyProfile.module.css";
import { useNavigate } from "react-router-dom";
import LoginForm from "../Login/LoginForm";
import {
  Box,
  Button,
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  FileUpload,
  Image,
  EditButton,
  Image as Img,
  InputGroup,
  Flex,
  Center,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { sendEmail } from "../../redux/actions/actions";

import axios from "axios";
import { Container } from "react-bootstrap";

const MyData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const {
    nombre,
    apellido,
    email,
    direccion,
    telefono,
    dni,
    ciudad,
    id,
    imagen,
  } = user;
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(user?.nombre || "");
  const [editedSurname, setEditedSurname] = useState(user?.apellido || "");
  const [editedEmail, setEditedEmail] = useState(user?.email || "");
  const [editedPhone, setEditedPhone] = useState(user?.telefono || "");
  const [editedCity, setEditedCity] = useState(user?.ciudad || "");
  const [editedDNI, setEditedDNI] = useState(user?.dni || "");
  const [editedAddress, setEditedAddress] = useState(user?.direccion || "");
  const [profileImage, setProfileImage] = useState(null);
  const [selectedUser, setselectedUser] = useState(user);
  const [isError, setIsError] = useState(false);

  const formMyProfile = {
    nombre: editedName,
    apellido: editedSurname,
    email: editedEmail,
    telefono: editedPhone,
    ciudad: editedCity,
    direccion: editedAddress,
    imagen: profileImage
  };

  const emailCurrent = localStorage.getItem("email");

  const [showModal, setShowModal] = useState(false);

  const toast = useToast();

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dzv1xau8l/upload",
        formData
      );
      console.log("Imagen subida:", response.data.secure_url);
      return response.data.secure_url;
    } catch (error) {
      alert("Error al cargar la imagen:", error);
      return null;
    }
  };

  const [form, setForm] = useState(formMyProfile);
  const [error, setError] = useState("");

  const validations = (form) => {
    let reg = /^[a-zA-Z\s]*$/;
    let regEmail = /^$|^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    let regNum = /^[0-9]*$/;
    let regAddress = /^[a-zA-Z0-9\s]*$/;

    const error = {};
    //NAME
    if (!reg.test(form.nombre)) {
      error.nombre = "Only accepts uppercase and lowercase letters.";
    } else if (form.nombre.length > 20) {
      error.nombre = "The name exceeds the maximum of 20 characters.";
    }

    //SURNAME
    if (!reg.test(form.apellido)) {
      error.apellido = "Only accepts uppercase and lowercase letters.";
    } else if (form.apellido.length > 20) {
      error.apellido = "The surname exceeds the maximum of 20 characters.";
    }

    //EMAIL
    if (!regEmail.test(form.email)) {
      error.email = "Check your email please";
    } else if (form.email.length > 40) {
      error.email = "The email exceeds the maximum of 40 characters.";
    }

    //PHONE
    if (!regNum.test(form.telefono)) {
      error.telefono = "Only numbers are accepted";
    } else if (form.telefono.length > 15) {
      error.telefono = "Text must be shorter than 15 characters";
    }

    //CITY
    if (!reg.test(form.ciudad)) {
      error.ciudad = "Only accepts uppercase and lowercase letters.";
    } else if (form.ciudad.length > 20) {
      error.ciudad = "The city exceeds the maximum of 20 characters.";
    }

    //ADDRESS
    if (!regAddress.test(form.direccion)) {
      error.direccion = "Only numbers and letters are allowed.";
    } else if (form.direccion.length > 20) {
      error.direccion = "The city exceeds the maximum of 20 characters.";
    }

    return error;
  };

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({
      ...form,
      [property]: value,
    });
    setError(validations({ ...form, [property]: value }));
  };

 

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleEditUser = () => {
    setEditMode(true);
  };

  const handleDeleteUser = () => {
    dispatch(deleteClient(id));
    alert("Account deleted");
    window.location.reload();
  };

  const handleSaveUser = async () => {
    try {
      if (profileImage) {
        // Subir imagen a Cloudinary
        const url = await uploadImage(profileImage);
        if (url) {
          var imageUrl = url;
        }
      }

      setselectedUser(form);
      dispatch(updateClientData(id, form));
      alert("Client Data updated");
      setEditMode(false);
    } catch (error) {
      alert("Error al guardar los datos del cliente");
    }
  };
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    dispatch(getUserDataByEmail(emailCurrent));
  }, [emailCurrent]);

  useEffect(() => {
    if (user) {
      dispatch(getClientData(user.id));
    }
  }, [selectedUser, form]);

  return (
    <Box
      backgroundImage={"https://wallpaperaccess.com/full/1812875.jpg"}
      minHeight={"100vh"}
      bgSize={"cover"}
      bgRepeat={"no-repeat"}
      paddingTop={"10em"}
      paddingBottom={"10em"}
    >
      {!emailCurrent ? (
        <Container>
          <Heading>
            Hey, I see that you are trying to access your Profile, but to do so,
            you must first be logged in.
          </Heading>
          <Button
            colorScheme="teal"
            shadow="2px 2px 4px rgba(0, 0, 0, 0.6)"
            type="submit"
            mt="1rem"
            _hover={{
              backgroundColor: "#1c6758",
              color: "rgb(214, 187, 187)",
            }}
            onClick={handleShowModal}
          >
            Click here to log in!{" "}
          </Button>
        </Container>
      ) : (
        <Center>
          {editMode ? (
            <Box
              pl="5em"
              pr="5em"
              bg="rgba(216, 216, 216, 0.9)"
              shadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
              w="40%"
              margin="auto"
              borderRadius={50}
              paddingBottom="2em"
            >
              <Heading
                padding={"0.5em"}
                marginTop={"0.1em"}
                fontSize={"4em"}
                mb="1rem"
                color={"white"}
                textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
              >
                <Text
                  fontWeight={"semibold"}
                  display={"inline"}
                  color={"lightseagreen"}
                  marginRight={-2}
                >
                  {" "}
                  Edit
                </Text>{" "}
                <Text fontWeight={"hairline"} display="inline">
                  User
                </Text>
                <small>👤</small>
              </Heading>
              <Box>
                <form id="fm" onSubmit={handleSaveUser}>
                  <FormControl isInvalid={!!error.nombre}>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      name="nombre"
                      type="text"
                      backgroundColor={"white"}
                      value={form.nombre}
                      onChange={(e) => changeHandler(e)}
                      borderColor={
                        editedName.length
                          ? error.nombre
                            ? "#e74c3c"
                            : "#2ecc71"
                          : "#52b3d3"
                      }
                      placeholder="Name"
                    />
                    <FormErrorMessage>{error.nombre}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!error.apellido}>
                    <FormLabel>Surname</FormLabel>
                    <Input
                      isDisabled={false}
                      name="apellido"
                      type="text"
                      backgroundColor={"white"}
                      value={form.apellido}
                      onChange={(e) => changeHandler(e)}
                      borderColor={
                        editedSurname.length
                          ? error.apellido
                            ? "#e74c3c"
                            : "#2ecc71"
                          : "#52b3d3"
                      }
                      placeholder="Surname"
                    />
                    <FormErrorMessage>{error.apellido}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!error.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      isDisabled={false}
                      name="email"
                      type="text"
                      backgroundColor={"white"}
                      value={form.email}
                      onChange={(e) => changeHandler(e)}
                      borderColor={
                        editedEmail.length
                          ? error.email
                            ? "#e74c3c"
                            : "#2ecc71"
                          : "#52b3d3"
                      }
                      placeholder="Email"
                    />
                    <FormErrorMessage>{error.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!error.telefono}>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      isDisabled={false}
                      name="telefono"
                      type="number"
                      backgroundColor={"white"}
                      value={form.telefono}
                      onChange={(e) => changeHandler(e)}
                      borderColor={
                        editedPhone.length
                          ? error.telefono
                            ? "#e74c3c"
                            : "#2ecc71"
                          : "#52b3d3"
                      }
                      placeholder="Phone"
                    />
                    <FormErrorMessage>{error.telefono}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!error.ciudad}>
                    <FormLabel>City</FormLabel>
                    <Input
                      isDisabled={false}
                      name="ciudad"
                      type="text"
                      backgroundColor={"white"}
                      value={form.ciudad}
                      onChange={(e) => changeHandler(e)}
                      borderColor={
                        editedCity.length
                          ? error.ciudad
                            ? "#e74c3c"
                            : "#2ecc71"
                          : "#52b3d3"
                      }
                      placeholder="City "
                    />
                    <FormErrorMessage>{error.ciudad}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!error.direccion}>
                    <FormLabel>Address</FormLabel>
                    <Input
                      isDisabled={false}
                      name="direccion"
                      type="text"
                      backgroundColor={"white"}
                      value={form.direccion}
                      onChange={(e) => changeHandler(e)}
                      borderColor={
                        editedAddress.length
                          ? error.direccion
                            ? "#e74c3c"
                            : "#2ecc71"
                          : "#52b3d3"
                      }
                      placeholder="Address "
                    />
                    <FormErrorMessage>{error.direccion}</FormErrorMessage>
                  </FormControl>
                  </form>
              </Box>
              <Input
                isDisabled={false}
                type="file"
                onChange={handleImageChange}
                variant="unstyled"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="md"
                value={form.imagen}
                p={2}
                mt={"1.5rem"}
              />
              <Button
                colorScheme="teal"
                shadow="2px 2px 4px rgba(0, 0, 0, 0.6)"
                type="submit"
                mt="1rem"
                _hover={{
                  backgroundColor: "#1c6758",
                  color: "rgb(214, 187, 187)",
                }}
                onClick={handleSaveUser}
                >
                Save Data
              </Button>
            </Box>
          ) : (
            <Box
              bg="rgba(216, 216, 216, 0.9)"
              shadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
              w="40%"
              margin="auto"
              borderRadius={50}
              paddingBottom={"2em"}
            >
              <Heading
                padding={"0.5em"}
                marginTop={"0.1em"}
                fontSize={"4em"}
                mb="1rem"
                color={"white"}
                textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
              >
                <Text
                  fontWeight={"semibold"}
                  display={"inline"}
                  color={"lightseagreen"}
                  marginRight={-2}
                >
                  {" "}
                  My
                </Text>{" "}
                <Text fontWeight={"hairline"} display="inline">
                  Profile
                </Text>
                <small>🌱</small>
              </Heading>
              {imagen ? (
                <Image
                  w={"220px"}
                  h={"220px"}
                  borderRadius={"50%"}
                  alt="Default Profile"
                  src={imagen}
                  margin={"auto"}
                  marginBottom={"3em"}
                />
              ) : (
                <Box w={"30%"} margin={"auto"} marginBottom={"3em"}>
                  {/* <Avatar bg="teal.500" size={60} /> */}
                  <Image
                    w={"220px"}
                    h={"220px"}
                    borderRadius={"50%"}
                    alt="Default Profile"
                    src={imagen}
                    margin={"auto"}
                    marginBottom={"3em"}
                  />
                </Box>
              )}
              <Text
                color="white"
                textShadow="2px 2px 4px rgba(0, 0, 0, 12)"
                marginBottom={"2em"}
              >
                {" "}
                <Heading
                  marginTop={"1em"}
                  as="h1"
                  color={"white"}
                  textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
                >
                  {nombre} {apellido}
                </Heading>
              </Text>
              <Text color="white" textShadow="2px 2px 4px rgba(0, 0, 0,12)">
                <p>
                  <span style={{ fontWeight: "bold" }}> Email: </span>
                  {email}
                </p>
              </Text>
              <Text color="white" textShadow="2px 2px 4px rgba(0, 0, 0, 12)">
                <p>
                  <span style={{ fontWeight: "bold" }}> Phone Number: </span>
                  {telefono}
                </p>
              </Text>
              <Text color="white" textShadow="2px 2px 4px rgba(0, 0, 0, 12)">
                {" "}
                <p>
                  <span style={{ fontWeight: "bold" }}> City: </span>
                  {ciudad}
                </p>
              </Text>
              <Text color="white" textShadow="2px 2px 4px rgba(0, 0, 0, 12)">
                {" "}
                <p>
                  <span style={{ fontWeight: "bold" }}> Address: </span>
                  {direccion}
                </p>
              </Text>
              <Button
                colorScheme="teal"
                shadow="2px 2px 4px rgba(0, 0, 0, 0.6)"
                type="submit"
                mt="1rem"
                _hover={{
                  backgroundColor: "#1c6758",
                  color: "rgb(214, 187, 187)",
                }}
                onClick={handleEditUser}
              >
                Edit User
              </Button>
            </Box>
          )}
        </Center>
      )}
    </Box>
  );
};

export default MyData;
