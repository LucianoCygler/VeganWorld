import React, { useState } from "react";
import { auth } from "../../Firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import {
  Box,
  Text,
  Button,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

function EmailValid(email) {
  const Reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return Reg.test(email);
}

function EmailInput({ value, onChange, isError }) {
  return (
    <FormControl isInvalid={isError}>
      <FormLabel>Email address</FormLabel>
      <Input
        placeholder="EMAIL"
        type="email"
        value={value}
        onChange={onChange}
      />
      {!isError ? (
        <FormHelperText
          textColor={"chakra-border-color._dark"}
          m="3"
          fontSize="1xl"
        >
          Enter the email you'd like to receive the newsletter on.
        </FormHelperText>
      ) : (
        <FormErrorMessage textDecorationColor={"red"} fontSize="1xl">
          Email is required.
        </FormErrorMessage>
      )}
      {/* <FormHelperText textDecor={TypeError} fontSize="2xl">
        We'll never share your email.
      </FormHelperText> */}
    </FormControl>
  );
}

function Resetpass() {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const valueInput = e.target.value;
    setEmail(valueInput);
    setIsError(!EmailValid(valueInput));
  };

  const handleClick = () => {
    if (!isError) {
      sendPasswordResetEmail(auth, email)
        .then(function () {
          // Correo electrónico de restablecimiento de contraseña enviado.
          alert("correo enviado");
        })
        .catch(function (error) {
          // Ocurrió un error al enviar el correo electrónico de restablecimiento de contraseña.
          alert(error);
        });
    }
  };

  return (
    <Box
    display="flex"
    overflow="hidden"
    justifyContent="center"
    alignItems="center"
    marginRight={0}
    maxW="100%"
    vh={100}
    scrollBehavior="smooth"
    paddingTop={950}
    margin={0}
    backgroundImage="url(https://wallpapercrafter.com/desktop/223806-vegan-vegan-cuisine-veggie-and-vegetarian-hd.jpg)"
    backgroundSize="cover" // Ajustar la imagen de fondo al tamaño de la caja
  //
    
    >
      <Box
       
       position="absolute"
       top="25%"
      //  left="50%"
      //  transform="traslate(50%,50%)"
       display="flex"
       flexDirection="column"
       overflow="hidden"
       justifyContent="center"
       alignItems="center"   
        boxShadow="dark-lg"
        rounded="md"
       
        bg="white"
        borderWidth="2px"
        borderRadius="lg"
      
        w={600}
        h={600}
        // p={600}
        // marginBlock={100}
        // marginInlineStart={650}
      >
        <Text
         display="flex"
         overflow={"hidden"}
         justifyContent="center"
          alignItems="center"
          as="i"
          textShadow="-6px 1px #010101"
          m="20"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
        >
          RESETPASS
        </Text>

        <Box
          display="flex"
          overflow={"hidden"}
          flexDirection="column" 
          justifyContent="center"
          alignItems="center"
          align="center"
          w={500}
        
        >
          <EmailInput value={email} onChange={handleChange} isError={isError} />
      
          <Button
            colorScheme="teal"
            size="lg"
            w={"100%"}
            // textShadow="5px 1px #010101"

            variant="solid"
            onClick={handleClick}
            fontSize="2xl"
            m="20"
            // fontWeight="extrabold"
          >
            Reset Password
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Resetpass;
