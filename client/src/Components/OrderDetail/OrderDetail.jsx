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
    <Box display={"flex"}>
      <AccordionItem
        textColor={"white"}
        fontWeight={"medium"}
        bg={"grey"}
        borderRadius={"2xl"}
        width={"100%"}
      >
        <AccordionButton
          mb={2}
          boxShadow={"dark-lg"}
          borderRadius={"2xl"}
          bg={"grey"}
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
