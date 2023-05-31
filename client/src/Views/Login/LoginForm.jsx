import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { auth, googleProvider } from "../../Firebase/firebase";
import { getIdToken, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getUserDataByEmail, registerUser, validateUserExistenceInDb } from "../../redux/actions/actions";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./LoginForm.css";

const LoginForm = ({ handleCloseModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("");
  const login = { email: email };
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [canLogin, setCanLogin] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [passError, setPassError] = useState(false);

  const handleRememberPassword = () => {
    setRememberPassword(!rememberPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validEmail && validPassword) {
      setCanLogin(true);
    } else {
      setCanLogin(false);
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        const idToken = await user.getIdToken();
        console.log("Inicio de sesión exitoso");

        setToken(idToken);
        localStorage.setItem("token", idToken);

        setValue(user.email);
        localStorage.setItem("email", user.email);

        handleCloseModal();
        window.location.reload();
      }
    } catch (error) {
      setPassError(true);
      console.log(error);
    }
  };

  const SignInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);

      const user = userCredential.user;
      const idToken = await user.getIdToken();
      console.log(user);

      dispatch(validateUserExistenceInDb({ email: user.email }));

      localStorage.setItem("token", idToken);
      setToken(idToken);

      localStorage.setItem("email", user.email);
      setValue(user.email);
      handleCloseModal();
      window.location.reload();
    } catch (error) { }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      setValidEmail(validarEmail(value));
    } else if (name === "password") {
      setPassword(value);
      setValidPassword(value.length >= 6);
      setPassError(false); // Reset passError when changing password field
    }

    if (value === "") {
      // Reset validation when value is empty
      if (name === "email") {
        setValidEmail(true);
      } else if (name === "password") {
        setValidPassword(true);
        setPassError(false);
      }
    }
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (user && value === "") {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const validarEmail = (email) => {
    const patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return patron.test(email);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <FormControl mb={4} isInvalid={!validEmail}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <FormErrorMessage>Correo electrónico inválido</FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={!validPassword || passError}>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        <FormErrorMessage>
          {passError ? "Contraseña inválida" : "La contraseña debe tener al menos 6 caracteres"}
        </FormErrorMessage>
      </FormControl>

      <FormControl mb={4}>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="form1Example3"
          checked={rememberPassword}
          onChange={handleRememberPassword}
        />
        <label className="form-check-label" htmlFor="form1Example3">
          Remember password
        </label>
      </FormControl>

      <button className="button2" type="button" onClick={handleSubmit}>
        Login
      </button>
      <Box>or</Box>
      <button className="button2" type="button" onClick={SignInWithGoogle}>
        Login with Google
      </button>

      <NavLink to={"/ResetPass"}>
        <p className="pass">I forgot my password</p>
      </NavLink>
    </Box>
  );
};

export default LoginForm;
