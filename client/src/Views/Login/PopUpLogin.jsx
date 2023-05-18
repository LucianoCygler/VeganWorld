import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./LoginForm";
const PopUpLogin = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const value = localStorage.getItem("email");
  return (
    <>
      {!value ? (
        <Button variant="primary" onClick={handleShowModal}>
          Login
        </Button>
      ) : (
        ""
      )}

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        handleCloseModal={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm handleCloseModal={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PopUpLogin;

{
  /* <button
  className="btn btn-lg btn-block btn-primary mb-2"
  style={{ backgroundColor: "#161616" }}
  type="submit"
  onClick={SignInWithGitHub}
>
  <i className="fab fa-facebook-f me-2"></i> Sign in with Github
</button> */
}
