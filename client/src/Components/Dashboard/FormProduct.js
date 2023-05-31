import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
	createProduct,
	getAllProducts,
	getAllProductsAdmin,
} from "../../redux/actions/actions";
import { Button, Paper, Tab, Tabs, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Pop_up from "../../Utils/Pop_up/Pop_up";
import { DataGrid } from "@mui/x-data-grid";
import ListProducts from "./Products/listProducts";

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

export default function FormProducts() {
	const fileInputRef = useRef(null);
	const dispatch = useDispatch();
	const { productsAdmin, deleteProduct } = useSelector((state) => state);
	const productsType = [
		...new Set(productsAdmin.map((product) => product.tipo)),
	];

	useEffect(() => {
		dispatch(getAllProductsAdmin());
	}, [deleteProduct]);

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
		} catch ({ message }) {
			Pop_up("error", "Error", `${message}`, "bottom-start");
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
		const text = event.target.innerText;
		text
			? setProduct({ ...product, tipo: text })
			: setProduct({ ...product, [name]: value });
	};

	const [valueTab, setValueTab] = useState("list");
	const handleTab = (event, value) => {
		setValueTab(value);
	};

	// const columns = [
	// 	{field:"id" , headerName : "ID", width:50},
	// 	{field:"name" , headerName : "NAME", width:150},
	// 	{field:"stock" , headerName : "STOCK"},
	// 	{field:"price" , headerName : "PRICE"},
	// 	{field:"status" , headerName : "STATUS"},

	// ]

	return (
		<>
			<Paper>
				<Box sx={{ borderBottom: 1, borderColor: "divider", margin: 2 }}>
					<Tabs value={valueTab} onChange={handleTab}>
						<Tab value={"list"} label={"-List Products"} />
						<Tab value={"create"} label={"-Create Product"} />
					</Tabs>
				</Box>
			</Paper>
			{
				valueTab === "list" && <ListProducts products={productsAdmin} />
				// <Box container id="list-products">
				// <DataGrid
				//   rows={rows}
				//   columns={columns}
				//   initialState={{
				//     pagination: {
				//       paginationModel: { page: 0, pageSize: 5 },
				//     },
				//   }}
				//   pageSizeOptions={[5, 10]}

				// />
				// 	</Box>
			}

			{valueTab === "create" && (
				<Box container id="create-product">
					<Box
						sx={{
							fontSize: "h5.fontSize",
							textAlign: "left",
							fontWeight: "bold",
							padding: "1rem",
							// color: "whitesmoke",
						}}
					>
						<Typography variant="h5">Create a new product</Typography>
					</Box>
					<Grid container spacing={2}>
						{/* ================PRODUCT NAME==================== */}
						<Grid sm={4} xs={12}>
							<Box
								sx={{
									fontSize: "1.38rem",
									textAlign: "left",
									padding: "1rem",
									// fontWeight: "bold",
									// color: "whitesmoke",
									fontFamily: "Montserrat",
								}}
							>
								Basic details
							</Box>
						</Grid>

						<Grid sm={8} xs={12}>
							<Paper
								elevation={2}
								sx={{
									padding: 2,
									marginBottom: 2,
									backgroundColor: "AppWorkspace",
								}}
							>
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
										fontSize: "1.1rem",
										textAlign: "left",
										padding: "1rem",
										fontFamily: "Montserrat",
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
									fontSize: "1.38rem",
									textAlign: "left",
									padding: "1rem",
									// fontWeight: "bold",
									// color: "whitesmoke",
									fontFamily: "Montserrat",
								}}
							>
								Image
							</Box>
						</Grid>
						<Grid sm={8} xs={12}>
							<Paper
								elevation={2}
								sx={{
									padding: 2,
									marginBottom: 2,
									backgroundColor: "AppWorkspace",
								}}
							>
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
							</Paper>
						</Grid>
						{/* ====================PRICE==================== */}
						<Grid sm={4} xs={12}>
							<Box
								sx={{
									fontSize: "1.38rem",
									textAlign: "left",
									padding: "1rem",
									// fontWeight: "bold",
									// color: "whitesmoke",
									fontFamily: "Montserrat",
								}}
							>
								Pricing
							</Box>
						</Grid>
						<Grid sm={8} xs={12}>
							<Paper
								elevation={2}
								sx={{
									padding: 2,
									marginBottom: 2,
									backgroundColor: "AppWorkspace",
								}}
							>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-evenly",
										flexWrap: "wrap",
										gap: 2,
									}}
								>
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
									fontSize: "1.38rem",
									textAlign: "left",
									padding: "1rem",
									// fontWeight: "bold",
									// color: "whitesmoke",
									fontFamily: "Montserrat",
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
									backgroundColor: "AppWorkspace",
								}}
							>
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
							sx={{
								bgcolor: "olivedrab",
								color: "whitesmoke",
								fontWeight: "800",
								fontSize: "1.1rem",
							}}
							onClick={handleClick}
						>
							Create Product
						</Button>
					</Box>
				</Box>
			)}
		</>
	);
}
