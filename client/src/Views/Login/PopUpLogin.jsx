import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const PopUpLogin = () => {
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState("login");

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const value = localStorage.getItem("email");

  return (
    <>
      {!value && (
        <Button variant="primary" onClick={handleShowModal}>
          Login
        </Button>
      )}

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        handleCloseModal={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="d-flex">
              <div
                className={`option ${view === "login" ? "actived" : ""}`}
                onClick={() => handleViewChange("login")}
              >
                Login
              </div>
              <div
                className={`option ${view === "signup" ? "actived" : ""}`}
                onClick={() => handleViewChange("signup")}
              >
                Sign Up
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {view === "login" ? (
            <LoginForm handleCloseModal={handleCloseModal} />
          ) : (
            <RegisterUser
              setView={setView}
              handleCloseModal={handleCloseModal}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PopUpLogin;
