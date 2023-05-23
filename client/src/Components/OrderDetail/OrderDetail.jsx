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

const OrderDetail = ({ order, cancelRef }) => {
  const { estado, direccion, productos, importe, fecha, id } = order;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <AccordionItem
      bg={"rgba(29, 92, 99, 0.8)"}
      textColor={"white"}
      fontWeight={"medium"}
    >
      <AccordionButton mb={2} boxShadow={"dark-lg"} borderRadius={"2xl"}>
        {/* CABEZERA DE LA ORDEN */}
        <Stack
          flex
          direction={"row"}
          justify={"space-around"}
          shouldWrapChildren={true}
          m={"auto"}
          spacing={"10"}
        >
          <Box as="span" flex="1" textAlign="left" fontWeight={"bold"}>
            Order: {id}
          </Box>
          <Box as="span" flex="1" textAlign="left" fontWeight={"bold"}>
            Date: {fecha}
          </Box>
          <Box as="span" flex="1" textAlign="left" fontWeight={"bold"}>
            Total Amount: $ {importe}
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
  );
};

export default OrderDetail;
