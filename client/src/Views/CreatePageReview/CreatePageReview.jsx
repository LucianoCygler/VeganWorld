import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPageReview,
  getClientPageReviews,
  getUserDataByEmail,
  updatePageReview,
} from "../../redux/actions/actions";
import {
  Avatar,
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputAddon,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Pop_up from "../../Utils/Pop_up/Pop_up";
import { Check } from "@mui/icons-material";

const CreatePageReview = () => {
  const user = useSelector((state) => state.user);
  const clientPageReview = useSelector((state) => state.clientPageReview);
  const emailCurrent = localStorage.getItem("email");
  const [editing, setEditing] = useState(false); // Nuevo estado para controlar la edición
  const [selectedReview, setSelectedReview] = useState();
  const dispatch = useDispatch();

  const handleEdit = () => {
    setEditing(true);
  };

  const [input, setInput] = useState({
    titulo: clientPageReview.titulo || "",
    descripcion: clientPageReview.descripcion || "",
  });
  const [error, setError] = useState({
    titulo: "",
    descripcion: "",
  });

  const validate = (input, error) => {
    const errors = { ...error };

    if (!input.titulo) errors.titulo = "*This input is mandatory.";
    else if (typeof input.titulo !== "string") {
      errors.titulo = "This input must have only letters";
    } else errors.titulo = "";

    if (!input.descripcion) errors.descripcion = "*This input is mandatory.";
    else errors.descripcion = "";

    return errors;
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(validate({ ...input, [e.target.name]: e.target.value }, error));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      const pageReview = {
        ...input,
        cliente_id: user?.id,
      };

      dispatch(createPageReview(pageReview));
      Pop_up(
        "success",
        "Congratulations",
        "Your review was added",
        "center",
        2000
      );
      setTimeout(() => {
        window.location.reload();
      }, 2100);
    } catch (error) {
      alert(error.message);
    }
    return;
  };

  const handleSaveReview = () => {
    const newPageReview = {
      id: clientPageReview?.id,
      titulo: input.titulo,
      descripcion: input.descripcion,
    };
    dispatch(updatePageReview(newPageReview));
    setEditing(false);
    window.location.reload();
  };

  useEffect(() => {
    dispatch(getUserDataByEmail(emailCurrent));
  }, [emailCurrent]);

  useEffect(() => {
    if (user) {
      dispatch(getClientPageReviews(user?.id));
    }
  }, [user]);

  return (
    <Box
      backgroundImage={"https://wallpaperaccess.com/full/1812875.jpg"}
      width={"100%"}
      minHeight={"100vh"}
    >
      <Box paddingTop={"10em"} display={"flex"} justifyContent={"center"}>
        <Text
          fontSize={"30px"}
          color="white"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
          position="relative"
          fontFamily="Montserrat"
        >
          MY PAGE REVIEW
          <Text
            as="span"
            position="absolute"
            left={"1%"}
            bottom={-5} 
            width="100%"
            height="3px"
            background="orange"
            fontFamily="Montserrat"
          />
        </Text>
      </Box>
      {clientPageReview ? (
        <Box display="flex" fontFamily="Montserrat" justifyContent={"center"} paddingTop={"2em"}>
          <Card
            marginRight="2em"
            marginTop={"2em"}
            padding={"2em"}
            fontFamily="Montserrat"
            minWidth={"10%"}
            width={{ base: "30%", md: "30%", lg: "30%", xl: "20%" }}
            overflow={"hidden"}
          >
            <Grid templateColumns={"repeat(2,1fr)"}>
              <Box marginBottom={"2em"} display="flex" fontFamily="Montserrat" justifyContent={"left"}>
                <Avatar src={clientPageReview.cliente_imagen} size="xl" />
              </Box>
              <Box>
                {" "}
                <Box display={"flex"} fontFamily="Montserrat" justifyContent={"center"}>
                  <Text fontFamily="Montserrat" fontWeight={"semibold"} color={"#3eb86b"}>
                    {clientPageReview.cliente_nombre}
                  </Text>
                </Box>
                <Box display={"flex"} fontFamily="Montserrat" justifyContent={"center"}>
                  {editing ? (
                    <Input
                      type="text"
                      name="titulo"
                      value={input.titulo}
                      onChange={handleChange}
                    />
                  ) : (
                    <Text fontWeight={"extrabold"}>
                      {clientPageReview.titulo}
                    </Text>
                  )}
                </Box>
                <Box display={"flex"} fontFamily="Montserrat" justifyContent={"center"}>
                  {editing ? (
                    <Textarea
                      type="text"
                      name="descripcion"
                      value={input.descripcion}
                      maxHeight="300px"
                      minHeight={"300px"}
                      fontFamily="Montserrat"
                      onChange={handleChange}
                      height={"6em"}
                    />
                  ) : (
                    <Text
                      fontSize={"14px"}
                      whiteSpace="pre-wrap"
                      wordWrap="break-word"
                      fontFamily="Montserrat"
                    >
                      {clientPageReview.descripcion}
                    </Text>
                  )}
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  position={"absolute"}
                  right="1em"
                  bottom={"-0.7em"}
                  fontFamily="Montserrat"
                >
                  <Text color="grey" fontSize={"10px"}>
                    {clientPageReview.fecha}
                  </Text>
                </Box>
              </Box>
            </Grid>
            {editing ? (
              <Box>
                <Button ml={2} mt="1em" fontFamily="Montserrat" size="sm" onClick={handleSaveReview}>
                  Save
                </Button>
                <Button
                  ml={2}
                  mt="1em"
                  size="sm"
                  fontFamily="Montserrat"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </Button>{" "}
              </Box>
            ) : (
              <Button ml={2} size="sm" fontFamily="Montserrat" onClick={handleEdit}>
                Edit Review
              </Button>
            )}
          </Card>
          <Box> </Box>
        </Box>
      ) : (
        <Box mt="6em" fontFamily="Montserrat" display={"flex"} justifyContent={"center"}>
          <Box
            bg="rgba(216, 216, 216, 0.9)"
            shadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
            w="25%"
            borderRadius={50}
            padding={"2em"}
            fontFamily="Montserrat"
          >
            <Heading
              marginBottom={"2em"}
              color="white"
              fontFamily="Montserrat"
              textShadow="2px 2px 4px rgba(0, 0, 0, 12)"
            >
              Leave your review!
            </Heading>
            <form onSubmit={submitHandler}>
              <Box>
                <FormLabel
                  color="white"
                  fontFamily="Montserrat"
                  textShadow="2px 2px 4px rgba(0, 0, 0, 12)"
                >
                  Title:{" "}
                </FormLabel>
                <Input
                  bg={"whiteAlpha.800"}
                  type="text"
                  name="titulo"
                  fontFamily="Montserrat"
                  mb="2em"
                  onChange={handleChange}
                ></Input>
                {/* <Text>{error.titulo}</Text> */}
              </Box>
              <Box>
                {" "}
                <FormLabel
                  color="white"
                  fontFamily="Montserrat"
                  textShadow="2px 2px 4px rgba(0, 0, 0, 12)"
                >
                  Description:{" "}
                </FormLabel>{" "}
                <Textarea
                  bg={"whiteAlpha.800"}
                  resize={"none"}
                  type="text"
                  name="descripcion"
                  height={"6em"}
                  fontFamily="Montserrat"
                  maxHeight={"8em"}
                  minHeight={"8em"}
                  onChange={handleChange}
                ></Textarea>
                {/* <Text>{error.descripcion}</Text> */}
              </Box>
              {error.titulo || error.descripcion ? (
                <Box  fontFamily="Montserrat" marginTop={"1em"}>
                  <Text fontSize={"12px"} fontFamily="Montserrat" color={"red"}>
                    Please, complete all the fields.
                  </Text>
                </Box>
              ) : (
                <Box fontFamily="Montserrat" marginTop={"3em"}>
                  <Button type="submit" fontFamily="Montserrat" colorScheme="teal">
                    Create
                  </Button>
                </Box>
              )}
            </form>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CreatePageReview;
