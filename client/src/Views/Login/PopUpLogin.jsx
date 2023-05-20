import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@chakra-ui/react";

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
        <Button
          onClick={handleShowModal}
          shadow="2px 2px 4px rgba(0, 0, 0, 1)"
          w={"90px"}
          h={"40px"}
          variant="solid"
          colorScheme="teal"
          margin={"auto"}
        >
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
            <RegisterForm
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
