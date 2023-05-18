import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientOrders } from "../../redux/actions/actions";
import OrderDetail from "../../Components/OrderDetail/OrderDetail";
import styles from "./MyOrders.module.css";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Image,
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableContainer,
	IconButton,
	Divider,
	useDisclosure,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialog,
	useToast,
	Tooltip,
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
import { DeleteIcon, NotAllowedIcon, SearchIcon } from "@chakra-ui/icons";

const MyOrders = () => {
	// const clientOrders = useSelector((state) => state.clientOrders);
	const isAuthenticated = useSelector((state) => state.isAuthenticated);
	const user = useSelector((state) => state.user);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toast = useToast();
	// useEffect(() => {
	//   if (isAuthenticated === false) {
	//     navigate("/login");
	//   } else {
	//     const client_id = user.id;
	//     dispatch(getClientOrders(client_id));
	//   }
	// }, [selectedOrder, isAuthenticated]);

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

	const closePopup = () => {
		setSelectedOrder(null);
		setIsPopupOpen(false);
	};

	const clientOrders = [
		{
			nombre: "agua tibia",
			tipo: "Comida",
			descripcion: "Contiene manzana, piña, uvas, melocoton.",
			precio: 130,
			stock: 88,
			imagen: "https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg",
		},
	];

	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();

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
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Cancel Order
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure? You can't undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button
								colorScheme="green"
								onClick={() => {
									toast({
										title: "Order canceled.",
										description: "We've canceled your order for you.",
										status: "success",
										duration: 3000,
										isClosable: true,
									});
									onClose();
								}}
								ml={3}
							>
								Accept
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>

			<Tabs variant="enclosed-colored">
				<TabList>
					<Tab>Pendientes</Tab>
					<Tab>En Proceso</Tab>
					<Tab>Entregados</Tab>
					<Tab>Cancelados</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
{/* Aca debajo se rendiza los TabPanels con un map de la cantidad de ordenes */}

						<Accordion defaultIndex={[0]} allowMultiple>
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
												Order: 21681
											</Box>
											<Box as="span" flex="1" textAlign="left">
												Date: 12/12/2020
											</Box>
											<Box as="span" flex="1" textAlign="left">
												Total Amount: $ 2225.22
											</Box>
										</Stack>
										<IconButton
											size={"sm"}
											icon={<NotAllowedIcon boxSize={"4em"} />}
											colorScheme="red"
											aria-label="Delete"
											onClick={(event) => {
												event.stopPropagation();
												onOpen();
											}}
											mx={10}
										/>

										<AccordionIcon />
									</AccordionButton>
									<Divider />
								<AccordionPanel pb={4}>
									<TableContainer>
										<Table size="sm">
											<Thead>
												<Tr>
													<Th>items</Th>
													<Th>description</Th>
													<Th textAlign={"center"}>qty</Th>
													<Th isNumeric>amount</Th>
												</Tr>
											</Thead>
											<Tbody>
												<Tooltip openDelay={"200"} label={<Image src="https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg" w={"fit-content"} />}>
													<Tr>
														<Td>Producto 1</Td>
														<Td>agua del rio</Td>
														<Td textAlign={"center"}>5</Td>
														<Td isNumeric>25.4</Td>
													</Tr>
												</Tooltip>
												<Tr>
													<Td>Producto 2</Td>
													<Td>ensalda de frutas tropicales</Td>
													<Td textAlign={"center"}>2</Td>
													<Td isNumeric>30.48</Td>
												</Tr>
												<Tr>
													<Td>Producto 3</Td>
													<Td>agua baja en caloria</Td>
													<Td textAlign={"center"}>3</Td>
													<Td isNumeric>0.91444</Td>
												</Tr>
											</Tbody>
											<Tfoot>
												<Tr>
													<Th>items</Th>
													<Th>description</Th>
													<Th textAlign={"center"}>qty</Th>
													<Th isNumeric>amount</Th>
												</Tr>
											</Tfoot>
										</Table>
									</TableContainer>
								</AccordionPanel>
							</AccordionItem>

							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box as="span" flex="1" textAlign="left">
											Section 2 title
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat.
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
					
					</TabPanel>
					<TabPanel>

						<Stepper size="lg" index={activeStep}>
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
					</TabPanel>{" "}
					<TabPanel>
						<p>two!</p>
					</TabPanel>{" "}
					<TabPanel>
						<p>two!</p>
					</TabPanel>{" "}
					<TabPanel>
						<p>two!</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
			{/* <div className={styles.mainContainer}>
				<div className={styles.orderscontainer}></div>
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
			</Container>

			{// ---------------PopUp------------------------ }
			{isPopupOpen && (
				<>
					<div className={styles.overlay} onClick={closePopup} />
					<div className={styles.popupcontainer}>
						<OrderDetail order={selectedOrder} closePopup={closePopup} />
					</div> 
				</>
			)}*/}
		</>
	);
};

export default MyOrders;
