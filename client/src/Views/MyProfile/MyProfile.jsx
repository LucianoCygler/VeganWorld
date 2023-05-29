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
} from "@chakra-ui/react";

import axios from "axios";
import { Container } from "react-bootstrap";

const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_upload_preset");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/da6d9ru3s/upload",
      formData
    );
    console.log("Imagen subida:", response.data.secure_url);
    return response.data.secure_url;
  } catch (error) {
    alert("Error al cargar la imagen:", error);
    return null;
  }
};

// const validations = (form) => {
//   let reg = /^[a-zA-Z\s]*$/;
//   let regEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

//   const error = {};
//   //NOMBRE
//   if (!form.name) {
//     error.name = "Name is required";
//   } else if (!reg.test(form.name)) {
//     error.name = "Only accepts uppercase and lowercase letters.";
//   } else if (form.name.length > 20) {
//     error.name = "The name exceeds the maximum of 15 characters.";
//   }

//   //EMAIL
//   if (!form.email) {
//     error.email = "Email is required in this field";
//   } else if (!regEmail.test(form.email)) {
//     error.email = "Check your email please";
//   } else if (form.email.length > 40) {
//     error.email = "The email exceeds the maximum of 40 characters.";
//   }

//   //COMENTARIOS
//   if (!form.textContainer) {
//     error.textContainer = "Please give us a comment...";
//   } else if (form.textContainer.length < 30) {
//     error.textContainer = "Text must be longer than 30 characters";
//   } else if (form.textContainer.length > 250) {
//     error.textContainer = "Text must be shorter than 250 characters";
//   }

//   return error;
// };

// const changeHandler = (event) => {
//   const property = event.target.name;
//   const value = event.target.value;
//   setForm({
//     ...form,
//     [property]: value,
//   });
//   setError(validations({ ...form, [property]: value }));
// };

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
  const [editedName, setEditedName] = useState(nombre || "");
  const [editedSurname, setEditedSurname] = useState(apellido || "");
  const [editedEmail, setEditedEmail] = useState(email || "");
  const [editedPhone, setEditedPhone] = useState(telefono || "");
  const [editedCity, setEditedCity] = useState(ciudad || "");
  const [editedDNI, setEditedDNI] = useState(dni || "");
  const [editedAddress, setEditedAddress] = useState(direccion || "");
  const [profileImage, setProfileImage] = useState(null);
  const [selectedUser, setselectedUser] = useState(user);
  const [isError, setIsError] = useState(false);
  const emailCurrent = localStorage.getItem("email");

  const [showModal, setShowModal] = useState(false);

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

      const newUser = {
        nombre: editedName,
        apellido: editedSurname,
        email: editedEmail,
        ciudad: editedCity,
        telefono: editedPhone,
        direccion: editedAddress,
        DNI: editedDNI,
        imagen: imageUrl,
      };

      setselectedUser(newUser);
      dispatch(updateClientData(id, newUser));
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
  }, [selectedUser]);

  return (
    <Box
      backgroundImage={"https://wallpaperaccess.com/full/1812875.jpg"}
      minHeight={"100vh"}
      bgSize={"cover"}
      bgRepeat={"no-repeat"}
      paddingTop={"8em"}
      paddingBottom={"1em"}
    >
      {" "}
      <Box marginBottom={"4em"}>
        <Text
          fontSize={"30px"}
          color="white"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
          position="relative"
        >
          PROFILE
          <Text
            as="span"
            position="absolute"
            left={"45%"}
            bottom={-5} // Ajusta este valor según el espaciado deseado
            width="10%"
            height="3px"
            background="orange"
          />
        </Text>
      </Box>
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
                {/* <FormControl isInvalid={isError}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="name"
                    type="text"
                    backgroundColor={"white"}
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    borderColor={
                      editedName.length
                        ? error.name
                          ? "#e74c3c"
                          : "#2ecc71"
                        : "#52b3d3"
                    }
                    autoComplete="off"
                    placeholder="Name"
                    isRequired
                  />
                </FormControl>
                <FormControl isInvalid={isError}>
                  <FormLabel>Surname</FormLabel>
                  <Input
                    type="text"
                    value={editedSurname}
                    onChange={(e) => setEditedSurname(e.target.value)}
                  />
                </FormControl>
                <FormControl isInvalid={isError}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="text"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                  {!isError ? (
                    <FormHelperText>
                      Enter the email you'd like to receive the newsletter on.
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={isError}>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    type="text"
                    value={editedPhone}
                    onChange={(e) => setEditedPhone(e.target.value)}
                  />
                </FormControl>
                <FormControl isInvalid={isError}>
                  <FormLabel>City</FormLabel>
                  <Input
                    type="text"
                    value={editedCity}
                    onChange={(e) => setEditedCity(e.target.value)}
                  />
                </FormControl>
                <FormControl isInvalid={isError}>
                  <FormLabel>Address</FormLabel>
                  <Input
                    type="text"
                    value={editedAddress}
                    onChange={(e) => setEditedAddress(e.target.value)}
                  />
                </FormControl> */}
              </Box>
              <Input
                className={style.input8B}
                type="file"
                onChange={handleImageChange}
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
              pt="2em"
              borderRadius={50}
              paddingBottom={"2em"}
            >
              {/* <Heading
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
              </Heading> */}
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
