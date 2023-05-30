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
  Input,
  InputAddon,
  Text,
  Textarea,
} from "@chakra-ui/react";

const CreatePageReview = () => {
  const user = useSelector((state) => state.user);
  const clientPageReview = useSelector((state) => state.clientPageReview);
  const emailCurrent = localStorage.getItem("email");
  const [editing, setEditing] = useState(false); // Nuevo estado para controlar la edición
  const dispatch = useDispatch();

  const handleEdit = () => {
    setEditing(true);
  };

  const [input, setInput] = useState({
    titulo: "",
    descripcion: "",
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
      setInput({
        titulo: "", // Corregir el nombre de la propiedad 'title'
        descripcion: "", // Corregir el nombre de la propiedad 'desc'
      });
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
      dispatch(getClientPageReviews(user?.nombre));
    }
  }, [user]);
  return (
    <Box bgColor="#C6BA9F" width={"100%"} minHeight={"100vh"}>
      <Box paddingTop={"8em"} display={"flex"} justifyContent={"center"}>
        <Text
          fontSize={"30px"}
          color="white"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
          position="relative"
        >
          MY PAGE REVIEW
          <Text
            as="span"
            position="absolute"
            left={"1%"}
            bottom={-5} // Ajusta este valor según el espaciado deseado
            width="100%"
            height="3px"
            background="orange"
          />
        </Text>
      </Box>
      {clientPageReview ? (
        <Box display="flex" justifyContent={"center"} paddingTop={"2em"}>
          <Card
            marginRight="2em"
            marginTop={"2em"}
            padding={"2em"}
            minWidth={"10%"}
            width={{ base: "30%", md: "30%", lg: "30%", xl: "20%" }}
            overflow={"hidden"}
          >
            <Grid templateColumns={"repeat(2,1fr)"}>
              <Box marginBottom={"2em"} display="flex" justifyContent={"left"}>
                <Avatar src={clientPageReview.cliente_imagen} size="xl" />
              </Box>
              <Box>
                {" "}
                <Box display={"flex"} justifyContent={"center"}>
                  <Text fontWeight={"semibold"} color={"#3eb86b"}>
                    {clientPageReview.cliente_nombre}
                  </Text>
                </Box>
                <Box display={"flex"} justifyContent={"center"}>
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
                <Box display={"flex"} justifyContent={"center"}>
                  {editing ? (
                    <Textarea
                      type="text"
                      name="descripcion"
                      maxHeight="300px"
                      minHeight={"300px"}
                      value={input.descripcion}
                      onChange={handleChange}
                      height={"6em"}
                    />
                  ) : (
                    <Text
                      fontSize={"14px"}
                      whiteSpace="pre-wrap"
                      wordWrap="break-word"
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
                >
                  <Text color="grey" fontSize={"10px"}>
                    {clientPageReview.fecha}
                  </Text>
                </Box>
              </Box>
            </Grid>
            {editing ? (
              <Box>
                <Button ml={2} mt="1em" size="sm" onClick={handleSaveReview}>
                  Save
                </Button>
                <Button
                  ml={2}
                  mt="1em"
                  size="sm"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </Button>{" "}
              </Box>
            ) : (
              <Button ml={2} size="sm" onClick={handleEdit}>
                Edit Review
              </Button>
            )}
          </Card>
          <Box> </Box>
        </Box>
      ) : (
        <Box mt="15em" display={"flex"} justifyContent={"center"}>
          <form onSubmit={submitHandler}>
            <Box>
              <FormLabel>Title: </FormLabel>
              <Input
                type="text"
                name="titulo"
                mb="2em"
                onChange={handleChange}
              ></Input>
              <Text>{error.titulo}</Text>
            </Box>
            <Box>
              {" "}
              <FormLabel>Description: </FormLabel>{" "}
              <Input
                type="text"
                name="descripcion"
                height={"6em"}
                onChange={handleChange}
              ></Input>
              <Text>{error.descripcion}</Text>
            </Box>
            {error.titulo || error.descripcion ? (
              <Box>
                <Text>Please, complete all the fields.</Text>
              </Box>
            ) : (
              <Box marginTop={"3em"}>
                <Button type="submit" colorScheme="teal">
                  Create
                </Button>
              </Box>
            )}
          </form>
        </Box>
      )}
    </Box>
  );
};

export default CreatePageReview;
