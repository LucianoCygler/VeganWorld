import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import style from "./ContactUs.module.css";
//
import {
  Box,
  VStack,
  HStack,
  Heading,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  Grid,
  GridItem,
  Center,
  Text,
} from "@chakra-ui/react";
import { sendEmail } from "../../redux/actions/actions";

const formContactUser = {
  name: "",
  email: "",
  textContainer: "",
};
const ContactUs = () => {
  const dispatch = useDispatch();
  const comment = [];
  const [form, setForm] = useState(formContactUser);

  const [error, setError] = useState(formContactUser);

  const validations = (form) => {
    let reg = /^[a-zA-Z\s]*$/;
    let regEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    const error = {};
    //NOMBRE
    if (!form.name) {
      error.name = "Name is required";
    } else if (!reg.test(form.name)) {
      error.name = "Only accepts uppercase and lowercase letters.";
    } else if (form.name.length > 20) {
      error.name = "The name exceeds the maximum of 15 characters.";
    }

    //EMAIL
    if (!form.email) {
      error.email = "Email is required in this field";
    } else if (!regEmail.test(form.email)) {
      error.email = "Check your email please";
    } else if (form.email.length > 40) {
      error.email = "The email exceeds the maximum of 40 characters.";
    }

    //COMENTARIOS
    if (!form.textContainer) {
      error.textContainer = "Please give us a comment...";
    } else if (form.textContainer.length < 30) {
      error.textContainer = "Text must be longer than 30 characters";
    } else if (form.textContainer.length > 250) {
      error.textContainer = "Text must be shorter than 250 characters";
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

  const toast = useToast();

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      Object.keys(error).length === 0 &&
      form.name.length &&
      form.textContainer.length
    ) {
      dispatch(sendEmail(form, "contact"));
      toast({
        title: "Thanks for your time.",
        description: "Good job!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setForm(formContactUser);
    } else {
      alert("Error, all fields must be validated in order to continue");
    }
  };

  return (
    <Box
      backgroundImage={"https://wallpaperaccess.com/full/1812875.jpg"}
      minHeight={"100vh"}
      bgSize={"cover"}
      bgRepeat={"no-repeat"}
      paddingTop={"10em"}
      paddingBottom={"10em"}
    >
      <Box
        bg="rgba(216, 216, 216, 0.9)"
        shadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
        w="40%"
        margin="auto"
        borderRadius={50}
        paddingBottom={"2em"}
        paddingRight={"2em"}
        paddingLeft={"2em"}
      >
        <Center>
          <Box>
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
                Visit
              </Text>{" "}
              <Text fontWeight={"hairline"} display="inline">
                Us!
              </Text>
              <small>📍</small>
            </Heading>
            <Box>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.703969221664!2d-58.497814741769595!3d-34.63692048947491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc93bc88e4279%3A0xc6e4c5cf528aa9fb!2sMundo%20Vegano!5e0!3m2!1ses!2sar!4v1684369093537!5m2!1ses!2sar"
                width={"100%em"}
                height={"300em"}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Box>
          </Box>
        </Center>
        <form id="fm" onSubmit={submitHandler}>
          <VStack spacing="2rem" alignItems="center">
            <Heading
              marginTop={"1em"}
              as="h1"
              color={"white"}
              textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
            >
              👇🏽 or send us an email below 👇🏽
            </Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem>
                <FormControl isInvalid={!!error.name}>
                  <FormLabel
                    htmlFor="name"
                    color={"black"}
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
                  >
                    Name:
                  </FormLabel>
                  <Input
                    name="name"
                    type="text"
                    backgroundColor={"white"}
                    value={form.name}
                    onChange={(e) => changeHandler(e)}
                    borderColor={
                      form.name.length
                        ? error.name
                          ? "#e74c3c"
                          : "#2ecc71"
                        : "#52b3d3"
                    }
                    autoComplete="off"
                    placeholder="Name"
                    isRequired
                  />
                  <FormErrorMessage>{error.name}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!error.email} mt="1rem">
                  <FormLabel
                    htmlFor="email"
                    color={"black"}
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
                  >
                    Email:
                  </FormLabel>
                  <Input
                    name="email"
                    type="text"
                    backgroundColor={"white"}
                    value={form.email}
                    onChange={(e) => changeHandler(e)}
                    borderColor={
                      form.email.length
                        ? error.email
                          ? "#e74c3c"
                          : "#2ecc71"
                        : "#52b3d3"
                    }
                    autoComplete="off"
                    placeholder="Email"
                    isRequired
                  />
                  <FormErrorMessage>{error.email}</FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isInvalid={!!error.textContainer}>
                  <FormLabel
                    htmlFor="textContainer"
                    color={"black"}
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
                  >
                    Comment:
                  </FormLabel>
                  <Textarea
                    backgroundColor={"white"}
                    resize={"none"}
                    name="textContainer"
                    type="text"
                    value={form.textContainer}
                    onChange={(e) => changeHandler(e)}
                    borderColor={
                      form.textContainer.length
                        ? error.textContainer
                          ? "#e74c3c"
                          : "#2ecc71"
                        : "#52b3d3"
                    }
                    autoComplete="off"
                    placeholder="Text"
                    isRequired
                  />
                  <FormErrorMessage>{error.textContainer}</FormErrorMessage>
                </FormControl>
              </GridItem>
            </Grid>
            <Button
              colorScheme="teal"
              shadow="2px 2px 4px rgba(0, 0, 0, 0.6)"
              type="submit"
              mt="1rem"
              _hover={{
                backgroundColor: "#1c6758",
                color: "rgb(214, 187, 187)",
              }}
            >
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};
export default ContactUs;
