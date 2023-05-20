import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialog,
	Button,
	useToast,
	useDisclosure,
} from "@chakra-ui/react";
import { deleteOrder } from "../../redux/actions/actions";

const AlertPopUp = ({ isOpen , onClose ,cancelRef, orderId }) => {
	const toast = useToast();
	const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
	var client_id = user.id;

	const refresh =()=>{}

	return (
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
								dispatch(deleteOrder(orderId))
								toast({
									title: "Order canceled.",
									description: "We've canceled your order for you.",
									status: "success",
									duration: 3000,
									isClosable: true,
								});
								onClose()
							}}
							ml={3}
						>
							Accept
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};

export default AlertPopUp;