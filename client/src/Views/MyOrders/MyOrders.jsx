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
  Text,
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
    { title: "Pending", description: "Order received" },
    { title: "In preparation", description: "Preparing" },
    { title: "Sent", description: "On the way" },
    { title: "Finalized", description: "Shipment received" },
  ];

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <>
      <Box
        backgroundImage={"https://wallpaperaccess.com/full/1812875.jpg"}
        bgSize={"cover"}
        bgPosition={"center"}
        h={"100vh"}
        w={"100%"}
        display={"flex"}
        justifyContent={"center"}
      >
        {" "}
        <Tabs
          variant="enclosed-colored"
          w={"80%"}
          mt={"12em"}
          // shadow={"lg"}
        >
          <Box>
            <Text
              fontSize={"30px"}
              color="white"
              textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
              position="relative"
            >
              ORDERS
              <Text
                as="span"
                position="absolute"
                left={"690px"}
                bottom={-5} // Ajusta este valor según el espaciado deseado
                width="10%"
                height="3px"
                background="orange"
              />
            </Text>
          </Box>
          <TabList color={"green.800"}>
            <Tab fontWeight={"extrabold"}>Pending</Tab>
            <Tab fontWeight={"extrabold"}>In Progress</Tab>
            <Tab fontWeight={"extrabold"}>Delivered</Tab>
            <Tab fontWeight={"extrabold"}>Cancelled</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {/* PENDING */}
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
      </Box>
    </>
  );
};

export default MyOrders;
