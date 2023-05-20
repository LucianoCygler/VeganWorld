import React from "react";
import {
	AccordionIcon,
	Box,
	Button,
	Stack,
	useDisclosure,
} from "@chakra-ui/react";

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
		<AccordionItem>
			<AccordionButton>
				{/* CABEZERA DE LA ORDEN */}
				<Stack
					flex
					direction={"row"}
					justify={"space-around"}
					shouldWrapChildren={true}
					m={"auto"}
					spacing={"10"}
				>
					<Box as="span" flex="1" textAlign="left">
						Order: {id}
					</Box>
					<Box as="span" flex="1" textAlign="left">
						Date: {fecha}
					</Box>
					<Box as="span" flex="1" textAlign="left">
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

						<Button
							mx={2}
							colorScheme="whatsapp"
							onClick={(event) => {
								event.stopPropagation();
								onOpen();
							}}
						>
							Pay order
						</Button>
					</>
				)}
				{/* BOTON DE DESPLEGAR */}
				<AccordionIcon />
			</AccordionButton>

			<AccordionPanel pb={4}>
				{/* AQUI SE HACE UN MAP DE LA ORDEN PARA OBTENER LOS PRODUCTOS */}
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
