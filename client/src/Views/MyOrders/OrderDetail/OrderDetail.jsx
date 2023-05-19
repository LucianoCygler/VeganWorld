import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../../redux/actions/actions";
import styles from "./OrderDetail.module.css";
import {
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	IconButton,
	Stack,
	useDisclosure,
} from "@chakra-ui/react";
import TableOrder from "../TableOrder/TableOrder";

const OrderDetail = ({ order, cancelRef, onOpen }) => {
	const { productos, importe, fecha, id, estado } = order;
	const dispatch = useDispatch();
	// Contar los productos repetidos
	const countProducts = productos.reduce((count, producto) => {
		count[producto] = (count[producto] || 0) + 1;
		return count;
	}, {});

	const popupRef = useRef(null);

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
				{
					estado === "Pendiente" && (
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
					)
				}
				{/* BOTON DE DESPLEGAR */}
				<AccordionIcon />
			</AccordionButton>

			<AccordionPanel pb={4} items={order.productos}>
				{/* AQUI SE HACE UN MAP DE LA ORDEN PARA OBTENER LOS PRODUCTOS */}
				<TableOrder items={order.productos} />
			</AccordionPanel>
		</AccordionItem>
	);
};

export default OrderDetail;
