import React from "react";

import {
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialog,
	Button,
	useToast,
} from "@chakra-ui/react";

const AlertPopUp = ({ isOpen, cancelRef, onClose }) => {
	const toast = useToast();

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
	);
};

export default AlertPopUp;
