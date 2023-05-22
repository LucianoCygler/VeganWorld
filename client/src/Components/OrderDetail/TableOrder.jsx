import {
	Image,
	TableContainer,
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	Tooltip,
	Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const TableOrder = ({ items }) => {
	const productsCart = useSelector((state) => state.products);

	return (
		<TableContainer>
			<Table size="sm">
				<Thead>
					<Tr>
						<Th>
							<Text color={"whiteAlpha.800"} as={"b"} fontSize={"xl"}>
								items
							</Text>
						</Th>
						<Th>
							<Text color={"whiteAlpha.800"} as={"b"} fontSize={"xl"}>
								description
							</Text>
						</Th>
						<Th textAlign="center">
							<Text color={"whiteAlpha.800"} as={"b"} fontSize={"xl"}>
								qty
							</Text>
						</Th>
						<Th isNumeric>
							<Text color={"whiteAlpha.800"} as={"b"} fontSize={"xl"}>
								amount
							</Text>
						</Th>
					</Tr>
				</Thead>
				{items.map((product) => {
					const findedProduct = productsCart?.find(
						(productC) => productC.nombre === product.slice(2)
					);
					return (
						<Tbody key={product.slice(2)}>
							<Tooltip
								openDelay={200}
								label={<Image src={findedProduct?.imagen} w="fit-content" />}
							>
								<Tr>
									<Td color>{findedProduct?.nombre}</Td>
									<Td>{findedProduct?.descripcion}</Td>
									<Td textAlign="center">{product[0]}</Td>
									<Td isNumeric>{findedProduct?.precio}</Td>
								</Tr>
							</Tooltip>
						</Tbody>
					);
				})}
				{/* <Tfoot>
          <Tr>
            <Th>items</Th>
            <Th>description</Th>
            <Th textAlign="center">qty</Th>
            <Th isNumeric>amount</Th>
          </Tr>
        </Tfoot> */}
			</Table>
		</TableContainer>
	);
};

export default TableOrder;
