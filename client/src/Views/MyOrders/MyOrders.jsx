import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientOrders,
  getUserDataByEmail,
} from "../../redux/actions/actions";
import OrderDetail from "./OrderDetail/OrderDetail";
import styles from "./MyOrders.module.css";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import LoginForm from "../Login/LoginForm";

import {
	Box,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Accordion,
	Divider,
	useDisclosure,
	useToast,
	Step,
	StepDescription,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
	useSteps,
} from "@chakra-ui/react";
import AlertPopUp from "./AlertPopUp/AlertPopUp";

const arrayProducts = require("../../Components/Products/arrayProducts.js");

const MyOrders = () => {
  const clientOrders = useSelector((state) => state.clientOrders);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toast = useToast();

  const userJSON = localStorage.getItem("user");
  const userObj = JSON.parse(userJSON);
  useEffect(() => {
    if (!userObj) {
      navigate("/login");
    } else {
      const client_id = userObj.id;
      dispatch(getClientOrders(client_id));
    }
  }, [selectedOrder, isAuthenticated]);

  const showPopupHandler = (order) => {
    setSelectedOrder(order);
    setIsPopupOpen(true);
  };

	const { activeStep } = useSteps({
		index: 1,
		count: steps.length,
	});

  return (
    <div className={styles.mainContainer}>
      <div className={styles.orderscontainer}>
        <h1>ORDERS</h1>
        {clientOrders?.map((order, index) => (
          <div
            key={index}
            className={styles.ordercard}
            onClick={() => showPopupHandler(order)}
          >
            <p>Pedido {index + 1}</p>
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <>
          <div className={styles.overlay} onClick={closePopup} />
          <div className={styles.popupcontainer}>
            <OrderDetail order={selectedOrder} closePopup={closePopup} />
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrders;
