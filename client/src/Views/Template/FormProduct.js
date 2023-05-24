import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/actions";

export default function FormPropsTextFields() {
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getAllProducts());
	}, []);

	const products = useSelector((state) => state.products);
	const productsName = products.map((product) => product.nombre);

	return (
		<>
			<Autocomplete
				disablePortal
				id="combo-box-demo"
				options={productsName} //aqui va el array de productos y se toma el name (product.name)
				sx={{ width: '500px', margin:5 , background:'yellow'}}
				renderInput={(params) => <TextField {...params} label="Products" />}
			/>
			<Box
				component="form"
				sx={{
					"& .MuiTextField-root": { m: 1, width: "25ch" },
				}}
				noValidate
				autoComplete="off"
			>
				<div>
					<TextField required id="outlined-required" label="Name" />
					{/**Este seria
				una lista desplegable donde se ve el nombres de los productos que estan
      en la base de datos */}
					<TextField required id="outlined-search" label="Type" type="search" />
					<TextField required id="outlined-required" label="Price" />{" "}
					<TextField
						required
						id="outlined-required"
						type="number"
						label="Stock"
						defaultValue="1"
					/>{" "}
      <TextField
        required
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows={4}
        placeholder="Desciption"
      />
				</div>
			</Box>
			<Box
				sx={{
					"& .MuiTextField-root": { m: 1 },
				}}
			>
				<TextField
					required
					id="outlined-required"
					type="file"
					label="Image"
					InputLabelProps={{
						shrink: true,
					}}
				/>{" "}
			</Box>
		</>
	);
}
