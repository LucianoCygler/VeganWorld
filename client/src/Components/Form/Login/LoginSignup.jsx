import style from "./LoginSignup.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { validateLogin, loginUser } from "../../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../../Firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Box, Button, Input, FormControl } from "@chakra-ui/react";


const LoginSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    contraseña: "",
  });

  const [error, setError] = useState({
    email: "",
    constraseña: ""
  });

  const [userValue, setUserValue] = useState("");
  console.log(userValue);

  const handleButtonAccess = async (event) => {
    event.preventDefault();
    const response = await dispatch(validateLogin(login));

    if (typeof response === "object") {
      dispatch(loginUser());
      navigate("/");
    }
  };

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setLogin({
      ...login,
      [property]: value,
    });
    setError(validateLogin({ ...login, [property]: value }));
  };

  const handleOnClick = () => {
    navigate("/Register");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, login.email, login.contraseña)
      .then((data) => {
        setUserValue(data.user.email);
        localStorage.setItem("email", data.user.email);
        dispatch(validateLogin(login));
        if (userValue) {
          dispatch(loginUser());
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleLogGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, googleProvider).then((data) => {
      setUserValue(data.user.email);
      localStorage.setItem("email", data.user.email);
    });
  };

  return (
    <Box className={style.container}>
      <form className={style.form}>
        <Box className={style.form_front}>
          <Box className={style.form_details}>Login</Box>
          <FormControl isInvalid={!!error.username}>
            <Input
              type="text"
              className={style.input}
              placeholder="Username"
              onChange={changeHandler}
              name="email"
              value={login.username}
            />
            </FormControl>

            <Input
              type="password"
              className={style.input}
              placeholder="Password"
              onChange={changeHandler}
              name="contraseña"
              value={login.password}
            />

            <Button className={style.btn} onClick={handleLogin}>
              Login
            </Button>
            <Button className={style.btn} type="button" onClick={handleLogGoogle}>
              Google
            </Button>
            <Box className={style.switch}>
              Don't have an account?{"        "}
              <label htmlFor="signup_toggle" className={style.signup_tog}>
                <Box className={style.signup} onClick={handleOnClick}>
                  Sign Up
                </Box>
              </label>
            </Box>
        </Box>
      </form>
    </Box>
  );
}

export default LoginSignup;
