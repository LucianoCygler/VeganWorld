import {
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Heading,
	Image,
	Stack,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Template2 = () => {
	const handleVariant = () => {};
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<>
			<header style={{paddingTop:'100px'}}>
				<Button onClick={toggleColorMode}>
					Toggle {colorMode === "light" ? "Dark" : "Light"}
				</Button>
			</header>
			<Card maxW="sm">
				<CardHeader>
					<Button>
						<FontAwesomeIcon
							icon={faHeartCrack}
							style={{ color: "#c11010" }}
							onClick={handleVariant}
						/>
					</Button>
				</CardHeader>
				<CardBody>
					<Image
						src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
						alt="Green double couch with wooden legs"
						borderRadius="lg"
					/>
					<Stack mt="6" spacing="3">
						<Heading size="md">Living room Sofa</Heading>
						<Text>
							This sofa is perfect for modern tropical spaces, baroque inspired
							spaces, earthy toned spaces and for people who love a chic design
							with a sprinkle of vintage design.
						</Text>
						<Text color="blue.600" fontSize="2xl">
							$450
						</Text>
					</Stack>
				</CardBody>
				<Divider />
				<CardFooter justifyContent={"center"}>
					<ButtonGroup spacing="2" justifyContent={"center"}>
						<Button variant="solid" colorScheme="green">
							Buy now
						</Button>
						<Button variant="solid" colorScheme="blue">
							Add to cart
						</Button>
					</ButtonGroup>
				</CardFooter>
			</Card>
		</>
	);
};

export default Template2;
