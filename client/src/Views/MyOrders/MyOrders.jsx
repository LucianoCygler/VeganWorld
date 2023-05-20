import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getClientOrders,
  getUserDataByEmail,
} from "../../redux/actions/actions";
import OrderDetail from "../../Components/OrderDetail/OrderDetail";

import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
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
import { Accordion } from "@chakra-ui/accordion";
import styles from "./MyOrders.module.css";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import LoginForm from "../Login/LoginForm";

const MyOrders = () => {
  const { clientOrders, orderDelete } = useSelector((state) => state);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const email = localStorage.getItem("email");

  useEffect(() => {
    dispatch(getUserDataByEmail(email));
  }, [email]);

  useEffect(() => {
    if (user) {
      dispatch(getAllProducts());
      dispatch(getClientOrders(user.id));
    }
  }, [user, orderDelete]);

  const cancelRef = useRef();

  const steps = [
    { title: "First", description: "Contact Info" },
    { title: "Second", description: "Date & Time" },
    { title: "Third", description: "Select Rooms" },
  ];

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <>
      {console.log(clientOrders)}
      <Tabs variant="enclosed-colored" w={"80%"} m={"auto"} pt={"40"}>
        <TabList>
          <Tab>Pending</Tab>
          <Tab>In Progress</Tab>
          <Tab>Delivered</Tab>
          <Tab>Cancelled</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            PENDING
            {/* Aca debajo se rendiza los TabPanels con un map de la cantidad de ordenes */}
            <Accordion allowMultiple w={"95%"}>
              {clientOrders.map((order, index) => {
                return (
                  order.estado === "Pendiente" && (
                    <OrderDetail order={order} cancelRef={cancelRef} />
                  )
                );
              })}
            </Accordion>
          </TabPanel>
          {/* TABPANEL EN PROCESO */}
          <TabPanel>
            IN PROGRESS
            <Stepper size="sm" index={activeStep} w={"90%"} m={"auto"}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box flexShrink="0">
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
            <Accordion defaultIndex={[0]} allowMultiple>
              {clientOrders.map((order, index) => {
                return (
                  order.estado === "En proceso" && (
                    <OrderDetail
                      order={order}
                      cancelRef={cancelRef}
                      state={order.estado}
                      //   client_id={client_id}
                    />
                  )
                );
              })}
            </Accordion>
          </TabPanel>{" "}
          {/* TABPANEL ENTREGADOS */}
          <TabPanel>
            <p>DELIVERED</p>
            <Accordion defaultIndex={[0]} allowMultiple>
              {clientOrders.map((order, index) => {
                return (
                  order.estado === "Entregado" && (
                    <OrderDetail
                      order={order}
                      cancelRef={cancelRef}
                      state={order.estado}
                      //   client_id={client_id}
                    />
                  )
                );
              })}
            </Accordion>
          </TabPanel>{" "}
          {/* TABPANEL CANCELADOS */}
          <TabPanel>
            <p>CANCELLED</p>
            <Accordion defaultIndex={[0]} allowMultiple>
              {clientOrders.map((order, index) => {
                return (
                  order.estado === "Cancelado" && (
                    <OrderDetail
                      order={order}
                      cancelRef={cancelRef}
                      state={order.estado}
                      //   client_id={client_id}
                    />
                  )
                );
              })}
            </Accordion>
          </TabPanel>{" "}
        </TabPanels>
      </Tabs>
    </>
  );
};

export default MyOrders;
