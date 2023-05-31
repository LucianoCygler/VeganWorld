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
      <Box pb={"15px"}>or</Box>

      <button class="button3" onClick={SignInWithGoogle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid"
          viewBox="0 0 256 262"
          class="logo"
        >
          <path
            fill="#4285F4"
            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
          ></path>
          <path
            fill="#34A853"
            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
          ></path>
          <path
            fill="#FBBC05"
            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
          ></path>
          <path
            fill="#EB4335"
            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
          ></path>
        </svg>
        <span class="spanGoogle">Continue with Google</span>
      </button>
      <Box pt={"15px"}>
        <NavLink to={"/ResetPass"}>
          <p className="pass">I forgot my password</p>
        </NavLink>
      </Box>
    </Box>
  );
};

export default LoginForm;
