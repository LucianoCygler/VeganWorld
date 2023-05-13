import style from "./LoginSignup.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  validateLogin,
  loginUser,
} from "../../../redux/actions/actions";
import { useNavigate } from "react-router-dom";


const LoginSignup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    contraseña: "",
  });

  const handleInputChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };


  const handleButtonAccess = (event) => {
    event.preventDefault();

    const response = dispatch(validateLogin(login));
    if (typeof response === "object") {
      dispatch(loginUser());
      navigate("/");
    }
  };

  const handleOnClick = () => {
    navigate("/Register");
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

          <button className={style.btn} type="submit">
            Login
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
