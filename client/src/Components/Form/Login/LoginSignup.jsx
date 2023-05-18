import style from "./LoginSignup.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { validateLogin, loginUser } from "../../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../../Firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    contraseña: "",
  });

  const [userValue, setUserValue] = useState("");
  console.log(userValue);

  const handleInputChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  // const handleButtonAccess = async (event) => {
  //   event.preventDefault();
  //   const response = await dispatch(validateLogin(login));

  //   if (typeof response === "object") {
  //     dispatch(loginUser());
  //     navigate("/");
  //   }
  // };

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
    <div className={style.container}>
      <form onSubmit={handleButtonAccess} className={style.form}>
        <div className={style.form_front}>
          <div className={style.form_details}>Login</div>

          <input
            type="text"
            className={style.input}
            placeholder="Username"
            onChange={handleInputChange}
            name="email"
            value={login.username}
          />

          <input
            type="password"
            className={style.input}
            placeholder="Password"
            onChange={handleInputChange}
            name="contraseña"
            value={login.password}
          />

          <button className={style.btn} onClick={handleLogin}>
            Login
          </button>
          <button className={style.btn} type="button" onClick={handleLogGoogle}>
            Google
          </button>
          <span className={style.switch}>
            Don't have an account?{"        "}
            <label htmlFor="signup_toggle" className={style.signup_tog}>
              <span className={style.signup} onClick={handleOnClick}>
                Sign Up
              </span>
            </label>
          </span>
        </div>
      </form>
    </div>
  );
};
export default LoginSignup;
