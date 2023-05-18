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
} from "@chakra-ui/react";

const TableOrder = ({ items }) => {
	return (
		<TableContainer>
			<Table size="sm">
				<Thead>
					<Tr>
						<Th>items</Th>
						<Th>description</Th>
						<Th textAlign="center">qty</Th>
						<Th isNumeric>amount</Th>
					</Tr>
				</Thead>
				{items.map((product) => {
					return (
						<Tbody key={product.id}>
							<Tooltip openDelay={200} label={<Image src={product.imagen} w="fit-content" />}>
								<Tr>
									<Td>{product.nombre}</Td>
									<Td>{product.descripcion}</Td>
									<Td textAlign="center">{product.cantidad}</Td>
									<Td isNumeric>{product.importe}</Td>
								</Tr>
							</Tooltip>
						</Tbody>
					);
				})}
				<Tfoot>
					<Tr>
						<Th>items</Th>
						<Th>description</Th>
						<Th textAlign="center">qty</Th>
						<Th isNumeric>amount</Th>
					</Tr>
				</Tfoot>
			</Table>
		</TableContainer>
	);
};

export default TableOrder;

