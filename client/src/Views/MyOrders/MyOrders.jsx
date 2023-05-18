import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientOrders } from "../../redux/actions/actions";
import OrderDetail from "./OrderDetail/OrderDetail";
import { useNavigate } from "react-router-dom";

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
	// const clientOrders = useSelector((state) => state.clientOrders);
	const isAuthenticated = useSelector((state) => state.isAuthenticated);
	const user = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toast = useToast();

	const userJSON = localStorage.getItem("user");
	const userObj = JSON.parse(userJSON);
	// useEffect(() => {
	//   if (!userObj) {
	//     navigate("/login");
	//   } else {
	//     const client_id = userObj.id;
	//     dispatch(getClientOrders(client_id));
	//   }
	// }, [selectedOrder, isAuthenticated]);

	const clientOrders = arrayProducts.array;

	const { isOpen, onOpen, onClose } = useDisclosure();
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
			<AlertPopUp isOpen={isOpen} cancelRef={cancelRef} onClose={onClose} />

			<Tabs variant="enclosed-colored">
				<TabList>
					<Tab>Pendientes</Tab>
					<Tab>En Proceso</Tab>
					<Tab>Entregados</Tab>
					<Tab>Cancelados</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						PENDIENTES
						{/* Aca debajo se rendiza los TabPanels con un map de la cantidad de ordenes */}
						<Accordion defaultIndex={[0]} allowMultiple>
							{clientOrders.map((order, index) => {
								return (
									order.estado === "Pendiente" && (
										<OrderDetail
											order={order}
											cancelRef={cancelRef}
											onOpen={onOpen}
										/>
									)
								);
							})}
						</Accordion>
					</TabPanel>
					{/* TABPANEL EN PROCESO */}
					<TabPanel>
						EN PROCESO
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
						<Accordion defaultIndex={[0]} allowMultiple>
							{clientOrders.map((order, index) => {
								return (
									order.estado === "En proceso" && (
										<OrderDetail
											order={order}
											cancelRef={cancelRef}
											onOpen={onOpen}
											state={order.estado}
										/>
									)
								);
							})}
						</Accordion>
					</TabPanel>{" "}
					{/* TABPANEL ENTREGADOS */}
					<TabPanel>
						<p>ENTREGADOS</p>
					</TabPanel>{" "}
					{/* TABPANEL CANCELADOS */}
					<TabPanel>
						<p>CANCELADOS</p>
					</TabPanel>{" "}
				</TabPanels>
			</Tabs>
		</>
	);
};

export default MyOrders;
