import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteProductAdmin,
	getAllProductsAdmin,
	updateProduct,
} from "../../../redux/actions/actions";

function createData(
	nombre,
	precio,
	stock,
	state,
	imagen,
	descripcion,
	id,
	tipo
) {
	return {
		nombre,
		precio,
		stock,
		state,
		imagen,
		descripcion,
		id,
		tipo,
	};
}

function Row(props) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);
	const dispatch = useDispatch();
	const handleDelete = (id) => {
		dispatch(deleteProductAdmin(id));
	};
	const products = useSelector((state) => state.productsAdmin);
	const [product, setProduct] = React.useState({});

	const handleUpdate = (id) => {
		const productExist = products.find((product) => product.id == id);
		const updatedProduct = {
			...productExist,
			...product,
		};
		setOpen(false);
		setHasChange(true);
		setNewValue({});
		// handleNewValue()
		dispatch(updateProduct(updatedProduct, id));
	};

	const [hasChange, setHasChange] = React.useState(true);
	const [newValue, setNewValue] = React.useState("");

	const handleNewValue = (event) => {
		const { name, value } = event.target;
		setNewValue({ ...newValue, [name]: value });
		setProduct({ ...product, [name]: value });
		setHasChange(false);
	};

	const [newNombre, setNewNombre] = React.useState(row.nombre || "");
	const [newTipo, setNewTipo] = React.useState(row.tipo || "");
	const [newPrecio, setNewPrecio] = React.useState("");

	const handleNewNombre = (event) => {
		const { value } = event.target;
		setNewNombre(value);
		setHasChange(false);
	};
	
	const handleNewTipo = (event) => {
		const { value } = event.target;
		setNewTipo(value);
		setHasChange(false);
	};
	
	const handleNewPrecio = (event) => {
		const { value } = event.target;
		setNewPrecio(value);
		setHasChange(false);
	};
	
	return (
		<React.Fragment>
			<TableRow
				sx={{ "& > *": { borderBottom: "unset" }, bgcolor: "aliceblue" }}
				onClick={() => setOpen(!open)}
			>
				<TableCell>
					<IconButton aria-label="expand row" size="large">
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					<Grid2 container>
						<Grid2 md={6}>
							<img src={row.imagen} width={120} />
						</Grid2>
						<Grid2 md={6}>{row.nombre}</Grid2>
					</Grid2>
				</TableCell>
				<TableCell align="center">{row.tipo}</TableCell>
				<TableCell align="center">{row.stock}</TableCell>
				<TableCell align="center">{row.precio}</TableCell>
				<TableCell align="center">
					{!row.state ? (
						<Box sx={{ color: "green" }} children={"Active"} />
					) : (
						<Box sx={{ color: "red" }} children={"Inactive"} />
					)}
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0, width: "100%" }}
					colSpan={6}
				>
					<Collapse in={open} timeout="auto" unmountOnExit state={row.state}>
						<Box sx={{ margin: 2, width: "100%" }}>
							<Typography variant="h6" gutterBottom component="div">
								Basic details
							</Typography>
							<Grid2 container gap>
								<Grid2>
									<TextField
										disabled={row.state}
										name="nombre"
										label="Product name"
										defaultValue={row.nombre}
										value={newNombre}
										onChange={handleNewNombre}
										InputLabelProps={{
											shrink: true,
										}}
									></TextField>
								</Grid2>
								<Grid2>
									<TextField
										disabled={row.state}
										name="tipo"
										label="Category"
										defaultValue={row.tipo}
										value={newTipo}
										onChange={handleNewTipo}
										InputLabelProps={{
											shrink: true,
										}}
									></TextField>
								</Grid2>
								<Grid2>
									<TextField
										disabled={row.state}
										name="precio"
										type="number"
										label="Old price"
										defaultValue={row.precio}
										InputProps={{
											readOnly: true,
										}}
										InputLabelProps={{
											shrink: true,
										}}
									></TextField>
								</Grid2>
								<Grid2>
									<TextField
										disabled={row.state}
										name="precio"
										type="number"
										label="New price"
										value={newPrecio}
										onChange={handleNewPrecio}
										InputLabelProps={{
											shrink: true,
										}}
									></TextField>
								</Grid2>
								{!row.state && (
									<Grid2 xs={12} px={8}>
										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
												padding: "5",
											}}
										>
											<Button
												onClick={() => handleUpdate(row.id)}
												disabled={hasChange}
											>
												Update
											</Button>
											<Button
												onClick={() => handleDelete(row.id)}
												sx={{ color: "red" }}
											>
												Delete
											</Button>
										</Box>
									</Grid2>
								)}
							</Grid2>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

Row.propTypes = {
	row: PropTypes.shape({
		name: PropTypes.string.isRequired,
		stock: PropTypes.number.isRequired,
		price: PropTypes.number.isRequired,
		status: PropTypes.string.isRequired,
	}).isRequired,
};

export default function ListProducts({ products }) {
	const rows = products.map((product) =>
		createData(
			product?.nombre,
			product?.precio,
			product?.stock,
			product?.deleted,
			product?.imagen,
			product?.descripcion,
			product?.id,
			product?.tipo
		)
	);
	const dispatch = useDispatch();

	const { productsAdmin, deleteProduct, updatedProduct } = useSelector(
		(state) => state
	);

	React.useEffect(() => {
		dispatch(getAllProductsAdmin());
	}, [deleteProduct]);
	React.useEffect(() => {
		dispatch(getAllProductsAdmin());
	}, [updatedProduct]);
	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow sx={{ bgcolor: "#319795", color: "white" }}>
						<TableCell />
						<TableCell
							align="center"
							sx={{ color: "whitesmoke", fontWeight: 900, fontSize: 18 }}
						>
							NAME
						</TableCell>
						<TableCell
							align="center"
							sx={{ color: "whitesmoke", fontWeight: 900, fontSize: 18 }}
						>
							TYPE
						</TableCell>
						<TableCell
							align="center"
							sx={{ color: "whitesmoke", fontWeight: 900, fontSize: 18 }}
						>
							STOCK
						</TableCell>
						<TableCell
							align="center"
							sx={{ color: "whitesmoke", fontWeight: 900, fontSize: 18 }}
						>
							PRICE
						</TableCell>
						<TableCell
							align="center"
							sx={{ color: "whitesmoke", fontWeight: 900, fontSize: 18 }}
						>
							STATUS
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<Row key={row?.name} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
