import React, { useState } from "react";
import {
	Grid,
	Box,
	Image,
	Text,
	Button,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	GridItem,
} from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons'


const Template = () => {
	const [products, setProducts] = useState([
		{
			id: 1,
			name: "CARNE",
			image:
				"http://guiadossolteiros.com/wp-content/uploads/2017/03/carne-boa.jpg",
			price: 10,
			quantity: 1,
		},
		{
			id: 2,
			name: "Product 2",
			image:
				"http://guiadossolteiros.com/wp-content/uploads/2017/03/carne-boa.jpg",
			price: 15,
			quantity: 2,
		},
		// Add more products here
	]);

	const handleQuantityChange = (productId, quantity) => {
		setProducts((prevProducts) =>
			prevProducts.map((product) =>
				product.id === productId ? { ...product, quantity } : product
			)
		);
	};

	const handleDeleteProduct = (productId) => {
		setProducts((prevProducts) =>
			prevProducts.filter((product) => product.id !== productId)
		);
	};

	const calculateTotal = () => {
		return products.reduce((total, product) => {
			return total + product.price * product.quantity;
		}, 0);
	};

	return (
		<Grid templateColumns="1fr 300px" gap={6}>
			<Box>
				{products.map((product) => (
					<Grid
						templateAreas={`"image image image name name btn"
                            "image image image price amount amount"
                            "image image image qty qty ."`}
						gridTemplateRows={"1fr 1fr 1fr"}
						gridTemplateColumns={"1fr 1fr 1fr 1fr 1fr 1fr"}
						minH="200px"
						key={product.id}
						templateColumns="auto 1fr auto"
						alignItems="center"
						borderBottom="1px solid gray"
						py={2}
            gap={2}
					>
						<GridItem pl={5} area={"image"} justifySelf={"center"}>
							<Image src={product.image} alt={product.name} boxSize="150px" />
						</GridItem>
						<GridItem area={"name"}>
							<Text fontSize="lg">{product.name}</Text>
						</GridItem>
						<GridItem area={"price"}>
							<Text>${product.price}</Text>
						</GridItem>
						<GridItem area={"amount"}>
							<Text>${product.price * product.quantity}</Text>
						</GridItem>
						<GridItem area={"qty"}>
							<NumberInput
								value={product.quantity}
								onChange={(value) => handleQuantityChange(product.id, value)}
								min={1}
								w={"6rem"}
							>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</GridItem>
						<GridItem area={"btn"}>
            
							<Button onClick={() => handleDeleteProduct(product.id)}>
              <DeleteIcon />
							</Button>
						</GridItem>
					</Grid>
				))}
			</Box>
			<Box>
				<Text fontSize="xl">Total: ${calculateTotal()}</Text>
			</Box>
		</Grid>
	);
};

export default Template;
