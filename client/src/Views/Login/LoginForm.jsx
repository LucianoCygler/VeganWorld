import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
import { auth, googleProvider } from "../../Firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { validateLogin } from "../../redux/actions/actions";
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

  const handleRememberPassword = () => {
    setRememberPassword(!rememberPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validEmail && validPassword) {
      setCanLogin(true);
      navigate("/");
    } else {
      setCanLogin(false);
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        localStorage.setItem("email", data.user.email);
        dispatch(validateLogin(login));
        localStorage.setItem("user", user);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SignInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
      handleCloseModal();
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      setValidEmail(validarEmail(value));
    } else if (name === "password") {
      setPassword(value);
      setValidPassword(value.length >= 6);
    }
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
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
    <div>
      <div className="form-outline mb-4">
        <input
          type="email"
          name="email"
          id="typeEmailX-2"
          className={`form-control form-control-lg ${
            validEmail ? "" : "is-invalid"
          }`}
          onChange={handleChange}
        />
        <label className="form-label" htmlFor="typeEmailX-2">
          Email
        </label>
        {!validEmail && (
          <div className="invalid-feedback">Correo electrónico inválido</div>
        )}
      </div>

      <div className="form-outline mb-4">
        <input
          type="password"
          name="password"
          id="typePasswordX-2"
          className={`form-control form-control-lg ${
            validPassword ? "" : "is-invalid"
          }`}
          onChange={handleChange}
        />
        <label className="form-label" htmlFor="typePasswordX-2">
          Password
        </label>
        {!validPassword && (
          <div className="invalid-feedback">
            La contraseña debe tener al menos 6 caracteres
          </div>
        )}
      </div>

      <div className="form-check d-flex justify-content-start mb-4">
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
      </div>

      <button class="button2" type="button" onClick={handleSubmit}>
        Login
      </button>

      {/* <NavLink to={"/Register"}>
        <button class="button2" type="button">
          Sign up
        </button>
      </NavLink> */}

      <NavLink to={"/ResetPass"}>
        <p class="pass">Olvide mi contraseña</p>
      </NavLink>

      <hr className="my-4" />

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
      {/* <button
        className="btn btn-lg btn-block btn-primary"
        style={{ backgroundColor: "#dd4b39" }}
        type="submit"
      > 
        <i className="fab fa-google me-2"></i> Sign in with Google
      </button> */}
    </div>
  );
};

export default LoginForm;
