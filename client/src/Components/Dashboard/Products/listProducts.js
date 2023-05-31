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
import { useDispatch } from "react-redux";
import { deleteProductAdmin } from "../../../redux/actions/actions";

function createData(name, price, stock, state, image, description, id, type) {
	return {
		name,
		price,
		stock,
		state,
		image,
		description,
		id,
		type,
	};
}

function Row(props) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);
	const dispatch = useDispatch();
	const handleDelete = (id) => {
		dispatch(deleteProductAdmin(id));
	};
	const handleUpdate = (id) => {

		console.log(id);
	};

	const [hasChange, setHasChange] = React.useState(true)
	const [newValue , setNewValue] = React.useState("")

	const handleNewValue = (event) =>{
		const { name, value } = event.target;
    setNewValue({ ...newValue, [name]: value });

		setHasChange(!hasChange)
	}
	return (
		<React.Fragment>
			<TableRow
				sx={{ "& > *": { borderBottom: "unset" }, bgcolor: "aliceblue" }}
				onClick={() => setOpen(!open)}
			>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="large"
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					<Grid2 container>
						<Grid2 md={6}>
							<img src={row.image} width={120} />
						</Grid2>
						<Grid2 md={6}>{row.name}</Grid2>
					</Grid2>
				</TableCell>
				<TableCell align="right">{row.stock}</TableCell>
				<TableCell align="right">{row.price}</TableCell>
				<TableCell align="right">
					{!row.state ?<Box sx={{color:"green"}}children={"Active"}/>  : <Box sx={{color:"red"}}children={"Inactive"}/>}
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
										name="name"
										label="Product name"
										defaultValue={row.name}
										value={newValue.name || row.name}
										onChange={handleNewValue}
										InputLabelProps={{
											shrink: true,
										}}
									></TextField>
								</Grid2>
								<Grid2>
									<TextField
										disabled={row.state}
										name="type"
										label="Category"
										defaultValue={row.type}
										value={newValue.type || row.type}
										onChange={handleNewValue}
										InputLabelProps={{
											shrink: true,
										}}
									></TextField>
								</Grid2>
								<Grid2>
									<TextField
										disabled={row.state}
										name="oldPrice"
										type="number"
										label="Old price"
										defaultValue={row.price}
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
										name="newPrice"
										type="number"
										label="New price"
										value={newValue.newPrice || ''}
										onChange={handleNewValue}
										InputLabelProps={{
											shrink: true,
										}}
									></TextField>
								</Grid2>
								{!row.state && <Grid2 xs={12} px={8}>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											padding: "5",
										}}
									>
										<Button onClick={() => handleUpdate(row.id)} disabled={hasChange}>Update</Button>
										<Button
											onClick={() => handleDelete(row.id)}
											sx={{ color: "red" }}
										>
											Delete
										</Button>
									</Box>
								</Grid2>}
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
			product.nombre,
			product.precio,
			product.stock,
			product.deleted,
			product.imagen,
			product.descripcion,
			product.id,
			product.tipo
		)
	);
	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow sx={{ bgcolor: "#319795", color: "white" }}>
						<TableCell />
						<TableCell sx={{width:300}} align="center">NAME</TableCell>
						<TableCell align="center">STOCK</TableCell>
						<TableCell align="center">PRICE</TableCell>
						<TableCell align="center">STATUS</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<Row key={row.name} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
