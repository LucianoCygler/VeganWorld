import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth, googleProvider } from "../../Firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { validateLogin } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom'


const PopUpLogin = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("");
  const login = {email: email, contraseña: password}

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        setValue(data.user.email);
        localStorage.setItem("email", data.user.email);
        dispatch(validateLogin(login))
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const SignInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
      handleCloseModal();
    });
  };

//   const SignInWithFacebook = () => {
//     signInWithPopup(auth, providerfb).then((data) => {
//       setValue(data.user.email);
//       localStorage.setItem("email", data.user.email);
//     });
//   };
//   const SignInWithGitHub = () => {
//     signInWithPopup(auth, providergit).then((data) => {
//       setValue(data.user.email);
//       localStorage.setItem("email", data.user.email);
//       handleCloseModal();
//     });
//   };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);
  console.log(value);
  return (
    <>
      {!value ? (
        <Button variant="primary" onClick={handleShowModal}>
          Login
        </Button>
      ) : (
        ""
      )}
     
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-outline mb-4">
            <input
              type="email"
              id="typeEmailX-2"
              className="form-control form-control-lg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label" htmlFor="typeEmailX-2">
              Email
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="typePasswordX-2"
              className="form-control form-control-lg"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label" htmlFor="typePasswordX-2">
              Password
            </label>
          </div>

          <div className="form-check d-flex justify-content-start mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="form1Example3"
            />
            <label className="form-check-label" htmlFor="form1Example3">
              Remember password
            </label>
          </div>

          <button
            className="btn btn-primary btn-lg btn-block"
            type="button"
            onClick={handleSubmit}
          >
            Login
          </button >

          <NavLink to={"/Register"}>
          <button className="btn btn-primary btn-lg btn-block"
            type="button">Sign up
            </button>
          </NavLink>

          <NavLink to={"/ResetPass"}> <p>Olvide mi contraseña</p> </NavLink>

          <hr className="my-4" />

          <button
            className="btn btn-lg btn-block btn-primary"
            style={{ backgroundColor: "#dd4b39" }}
            type="submit"
            onClick={SignInWithGoogle}
          >
            <i className="fab fa-google me-2"></i> Sign in with Google
          </button>
          {/* <button
            className="btn btn-lg btn-block btn-primary mb-2"
            style={{ backgroundColor: "#161616" }}
            type="submit"
            onClick={SignInWithGitHub}
          >
            <i className="fab fa-facebook-f me-2"></i> Sign in with Github
          </button> */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PopUpLogin;