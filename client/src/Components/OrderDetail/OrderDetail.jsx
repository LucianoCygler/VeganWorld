import {
  AccordionIcon,
  Box,
  Button,
  Grid,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../redux/actions/actions";
import styles from "./OrderDetail.module.css";
import Steps from "./Steps";
import Example from "./Steps";

import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/accordion";

import TableOrder from "./TableOrder";
import AlertPopUp from "./AlertPopUp";
import {
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
const OrderDetail = ({ order, cancelRef }) => {
  const { estado, direccion, productos, importe, fecha, id } = order;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const steps = [
    { title: "Pending", description: "Order received" },
    { title: "In preparation", description: "Preparing" },
    { title: "Sent", description: "On the way" },
    { title: "Finalized", description: "Shipment received" },
  ];
  var index = 0;
  switch (estado) {
    case "Pendiente":
      index = 1;
      break;
    case "Preparación":
      index = 2;
      break;
    case "Envío":
      index = 3;
      break;
    case "Finalizado":
      index = 4;
      break;
  }
  const { activeStep } = useSteps({
    index,
    count: steps.length,
  });
  const stepperSize = useBreakpointValue({
    base: "xs",
    md: "xs",
    lg: "xs",
    xl: "sm",
  });

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <AccordionItem
        textColor={"white"}
        fontWeight={"medium"}
        bg={"rgba(69, 123, 85, 0.8)"}
        borderRadius={"2xl"}
        width={"70%"}
        minWidth={"70%"}
        mb="1em"
      >
        <AccordionButton
          height={"120px"}
          mb={2}
          boxShadow={"dark-lg"}
          borderRadius={"2xl"}
          bg={"rgba(69, 123, 85, 0.8)"}
          pt="1em"
          minWidth={"90%"}
        >
          {/* CABEZERA DE LA ORDEN */}
          {/* <Stack
            direction={"row"}
            shouldWrapChildren={true}
            m={"auto"}
            marginLeft={2}
            pt="0.5em"
          > */}
          <Box>
            <Grid
              templateColumns={
                estado !== "Cancelado" ? "repeat(2,1fr)" : "repeat(2,1fr)"
              }
            >
              {" "}
              <Box mb="2em" display={"flex"} justifyContent={"left"} mr="5em">
                <Grid templateColumns={"repeat(3,1fr)"} gap={4}>
                  {" "}
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={"bold"}
                    marginLeft={"2em"}
                  >
                    Order {id}
                  </Box>
                  <Box as="span" flex="1" textAlign="left" fontWeight={"bold"}>
                    {fecha}
                  </Box>
                  <Box
                    // paddingLeft={"40em"}
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={"bold"}
                  >
                    $ {importe}
                  </Box>
                </Grid>{" "}
              </Box>
              <Box maxWidth="100%" textOverflow="ellipsis" whiteSpace="nowrap">
                <Stepper
                  size={stepperSize}
                  index={activeStep}
                  colorScheme="teal"
                >
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
                        <StepDescription>
                          <Text color={"white"}>{step.description}</Text>
                        </StepDescription>
                      </Box>

                      <StepSeparator>
                        <div
                          style={{
                            width: "50px",

                            background: "white",
                          }}
                        />
                      </StepSeparator>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Grid>
            {estado === "Pendiente" && (
              <Box display="flex" justifyContent={"right"}>
                <Button
                  colorScheme="red"
                  onClick={(event) => {
                    event.stopPropagation();
                    onOpen();
                  }}
                >
                  Cancel Order
                </Button>
              </Box>
            )}
          </Box>
          {/* </Stack> */}
          {/* BOTON DE CANCELAR */}
          {/* BOTON DE DESPLEGAR */}
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel pb={4}>
          <TableOrder items={order.productos} />
        </AccordionPanel>

        <AlertPopUp
          isOpen={isOpen}
          cancelRef={cancelRef}
          onClose={onClose}
          orderId={id}
        />
      </AccordionItem>
    </Box>
  );
};

export default OrderDetail;
