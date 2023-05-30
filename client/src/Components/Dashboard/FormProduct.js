import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, getAllProducts } from "../../redux/actions/actions";
import {
	Button,
	ButtonBase,
	Divider,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Typography,
} from "@mui/material";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Pop_up from "../../Utils/Pop_up/Pop_up";

const uploadImage = async (file) => {
	try {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", "my_upload_preset");

		const response = await axios.post(
			"https://api.cloudinary.com/v1_1/dzv1xau8l/upload",
			formData
		);
		return response.data.secure_url;
	} catch (error) {
		alert("Error al cargar la imagen:", error);
		return null;
	}
};
export default function FormPropsTextFields() {
	const fileInputRef = useRef(null);

	const handleOpenFileBrowser = () => {
		fileInputRef.current.click();
	};

	const handleFileSelect = (event) => {
		const selectedFile = event.target.files[0];
		// Hacer algo con el archivo seleccionado
		console.log(selectedFile);
	};
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state);
	const productsType = [...new Set(products.map((product) => product.tipo))];

	useEffect(() => {
		dispatch(getAllProducts());
	}, []);

	const [product, setProduct] = useState({
		nombre: "",
		tipo: "",
		precio: "",
		stock: "",
		descripcion: "",
	});

	const handleClick = async () => {
	
			if (productImage) {
			// Subir imagen a Cloudinary
			const url = await uploadImage(productImage);
			if (url) {
				var imageUrl = url;
			}
		}
			try {
		const newProduct = {
			nombre: product.nombre,
			tipo: product.tipo,
			precio: product.precio,
			stock: product.stock,
			descripcion: product.descripcion,
			imagen: imageUrl,
		};
		dispatch(createProduct(newProduct));
		} catch ({message}) {
		Pop_up('error','Error',`${message}`,'bottom-start')	
		}
		
	};

	const [productImage, setProductImage] = useState("");

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setProductImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		const text = event.target.innerText
		text 
		? setProduct({ ...product, tipo: text })
		:
		setProduct({ ...product, [name]: value });
	};

	const [editProduct, setEditProduct] = useState(false);

	return (
		<>
			<Box
				sx={{
					fontSize: "h5.fontSize",
					textAlign: "left",
					fontWeight: "bold",
					padding: "1rem",
					color:"whitesmoke"
					
				}}
			>
				<Typography variant="h5">
				{!editProduct ? "Create a new product" : "Edit product"}
				</Typography>
			</Box>
			<Grid container spacing={2}>
				{/* ================PRODUCT NAME==================== */}
				<Grid sm={4} xs={12}>
					<Box
						sx={{
							fontSize: "h2",
							textAlign: "left",
							padding: "1rem",
							fontWeight: "bold",
							color:"whitesmoke"
						}}
					>
						Basic details
					</Box>
				</Grid>

				<Grid sm={8} xs={12}>
					<Paper elevation={2} sx={{ padding: 2, marginBottom: 2 , backgroundColor:"AppWorkspace"}}>
						<TextField
							sx={{ width: "90%" }}
							required
							id="outlined-required"
							label="Product name"
							name="nombre"
							value={product.nombre}
							onChange={handleChange}
						/>
						<Box
							sx={{
								fontSize: "h2",
								textAlign: "left",
								padding: "1rem",
							}}
						>
							Desciption
						</Box>
						<TextField
							required
							sx={{ width: "90%" }}
							id="outlined-multiline-static"
							name="descripcion"
							label="Description"
							multiline
							rows={4}
							value={product.descripcion}
							onChange={handleChange}
						/>
					</Paper>
				</Grid>
				{/* ====================IMAGE==================== */}
				<Grid sm={4} xs={12}>
					<Box
						sx={{
							fontSize: "h2",
							textAlign: "left",
							padding: "1rem",
							fontWeight: "bold",
							color:"whitesmoke"
						}}
					>
						Image
					</Box>
				</Grid>
				<Grid sm={8} xs={12}>
					<Paper elevation={2} sx={{ padding: 2, marginBottom: 2, backgroundColor:"AppWorkspace" }}>
						<Box>
							<TextField
								required
								fullWidth={true}
								id="outlined-required"
								name="imagen"
								type="file"
								label="Image"
								value={product.imagen}
								onChange={handleImageChange}
								InputLabelProps={{
									shrink: true,
								}}
							/>{" "}
						</Box>
						{/* <div>  */}
						{/* <TextField
							required
							fullWidth
							id="outlined-required"
							name="imagen"
							type="file"
							label="Image"
							value=""
							onChange={handleFileSelect}
							InputLabelProps={{
								shrink: true,
							}}
							style={{ display: "none" }}
							inputRef={fileInputRef}
						/>
						<Button variant="outlined" onClick={handleOpenFileBrowser}>
							Seleccionar archivo
						</Button> */}
						{/* </div> */}
					</Paper>
				</Grid>
				{/* ====================PRICE==================== */}
				<Grid sm={4} xs={12}>
					<Box
						sx={{
							fontSize: "h2",
							textAlign: "left",
							padding: "1rem",
							fontWeight: "bold",
							color:"whitesmoke"
						}}
					>
						Pricing
					</Box>
				</Grid>
				<Grid sm={8} xs={12}>
					<Paper elevation={2} sx={{ padding: 2, marginBottom: 2 , backgroundColor:"AppWorkspace"}}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-evenly",
								flexWrap: "wrap",
								gap: 2,
							}}
						>
							{editProduct && (
								<TextField
									id="outlined-required"
									name="OldPrice"
									type="number"
									label="Old Price"
									// value={product.precio}
									// onChange={handleChange}
								/>
							)}
							<TextField
								required
								id="outlined-required"
								name="precio"
								type="number"
								label="Price"
								value={product.precio}
								onChange={handleChange}
							/>
							<TextField
								required
								id="outlined-required"
								name="stock"
								type="number"
								label="Stock"
								defaultValue="1"
								value={product.stock}
								onChange={handleChange}
							/>
						</Box>
					</Paper>
				</Grid>

				{/* ====================TYPE==================== */}
				<Grid sm={4} xs={12}>
					<Box
						sx={{
							fontSize: "h2",
							textAlign: "left",
							padding: "1rem",
							fontWeight: "bold",
							color:"whitesmoke"
						}}
					>
						Categories
					</Box>
				</Grid>
				<Grid sm={8} xs={12}>
					<Paper
						elevation={2}
						sx={{
							padding: 2,
							marginBottom: 2,
							display: "flex",
							justifyContent: "space-evenly",
							flexWrap: "wrap",
							backgroundColor:"AppWorkspace"
						}}
					>
						{/* <TextField
							select
							label="Select a category"
							sx={{ width:300, marginRight: 2 }}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{products &&
								lista.map((product) => {
									return (
										<MenuItem
											name="tipo"
											value={product.tipo}
											children={product.tipo}
										/>
									);
								})}
						</TextField> */}
						<Autocomplete
							disablePortal
							options={productsType}
							sx={{ width: [300], margin: 2 }}
							renderInput={(params) => (
								<TextField {...params} label="Categorys" />
							)}
							onChange={handleChange}

						/>
						<TextField
							required
							name="tipo"
							label="Category"
							value={product.tipo}
							onChange={handleChange}
							helperText="If category is not on the list, put the new category here"
						/>
					</Paper>
				</Grid>
			</Grid>
			<Box m={2}>
				<Button
					variant="contained"
					color="success"
					size="large"
					sx={{ bgcolor: "olivedrab", color: "whitesmoke", fontWeight: "bold" }}
					onClick={handleClick}
				>
					Create Product
				</Button>
			</Box>
		</>
	);
}
