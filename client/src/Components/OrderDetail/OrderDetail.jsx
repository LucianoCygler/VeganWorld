import {
  AccordionIcon,
  Box,
  Button,
  Stack,
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

  return (
    <Box display={"flex"}>
      <AccordionItem
        textColor={"white"}
        fontWeight={"medium"}
        bg={"#1d5c51"}
        borderRadius={"2xl"}
        width={"100%"}
      >
        <AccordionButton
          mb={2}
          boxShadow={"dark-lg"}
          borderRadius={"2xl"}
          bg={"#1d5c59"}
          pt="1em"
        >
          {/* CABEZERA DE LA ORDEN */}
          <Stack
            flex
            direction={"row"}
            justify={"space-around"}
            shouldWrapChildren={true}
            m={"auto"}
            marginLeft={2}
            spacing={"40"}
            pt="0.5em"
          >
            <Box
              as="span"
              flex="1"
              textAlign="left"
              fontWeight={"bold"}
              marginLeft={"3em"}
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
            <Box>
              <Stepper
                size="sm"
                index={activeStep}
                w={"100%"}
                gap={20}
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
          </Stack>
          {/* BOTON DE CANCELAR */}
          {estado === "Pendiente" && (
            <>
              <Button
                mx={2}
                colorScheme="red"
                onClick={(event) => {
                  event.stopPropagation();
                  onOpen();
                }}
              >
                Cancel Order
              </Button>
              {/* 
              <Button
                mx={2}
                colorScheme="whatsapp"
                onClick={(event) => {
                  event.stopPropagation();
                  onOpen();
                }}
              >
                Pay order
              </Button> */}
            </>
          )}
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
