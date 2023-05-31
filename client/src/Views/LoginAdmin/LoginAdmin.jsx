import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  createPageReview,
  getClientPageReviews,
  getUserDataByEmail,
  updatePageReview,
  validateAdminLogin,
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
import { local } from "d3";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    usuario: "",
    contraseña: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const loginUser = {
        usuario: input.usuario,
        contraseña: input.contraseña,
      };
      const userValidated = await dispatch(validateAdminLogin(loginUser));
      if (userValidated) {
        localStorage.setItem("admin", userValidated.usuario);
        navigate("/admin");
      }
    } catch (error) {
      alert(error.message);
    }
    return;
  };

  return (
    <Box
      backgroundImage={"https://wallpaperaccess.com/full/1812875.jpg"}
      width={"100%"}
      minHeight={"100vh"}
      display={"flex"}
      justifyContent={"center"}
    >
      <Box
        marginTop={"12em"}
        padding={"1em"}
        width={"18%"}
        bg={"grey"}
        height={"-webkit-fit-content"}
        borderRadius={"1em"}
      >
        <Heading
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
          color={"white"}
          marginBottom={"1em"}
        >
          Admin login
        </Heading>
        <Box>
          <form onSubmit={submitHandler}>
            <FormLabel color="white" textShadow="2px 2px 4px rgba(0, 0, 0, 12)">
              User:
            </FormLabel>
            <Input
              name="usuario"
              type="text"
              bg="white"
              marginBottom={"2em"}
              onChange={handleChange}
            ></Input>{" "}
            <FormLabel color="white" textShadow="2px 2px 4px rgba(0, 0, 0, 12)">
              Password:
            </FormLabel>
            <Input
              name="contraseña"
              type="text"
              bg="white"
              marginBottom={"2em"}
              onChange={handleChange}
            ></Input>
            <Button type="submit">Sign in</Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginAdmin;
