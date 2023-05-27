import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, getAllProducts } from "../../redux/actions/actions";
import { Button, ButtonBase, colors } from "@mui/material";
import axios from "axios";

const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_upload_preset");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/da6d9ru3s/upload",
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    alert("Error al cargar la imagen:", error);
    return null;
  }
};

export default function FormPropsTextFields() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);
	const productsName = products.map((product) => product.nombre);

	useEffect(() => {
		dispatch(getAllProducts());
	}, []);

	const [product, setProduct] = useState({
		nombre: "",
		tipo: "",
		precio: "",
		stock: "",
		descripcion: ""
	});

	const handleClick = async () => {
		if (productImage) {
			// Subir imagen a Cloudinary
			const url = await uploadImage(productImage);
			if (url) {
				var imageUrl = url;
			}
		}
		const newProduct = {
		nombre: product.nombre,
		tipo: product.tipo,
		precio: product.precio,
		stock: product.stock,
		descripcion: product.descripcion,
		imagen: imageUrl,
		}
		dispatch(createProduct(newProduct));
	};

const [productImage, setProductImage] = useState('')

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
		setProduct({ ...product, [name]: value });

	};
	return (
		<>
			{/* <Autocomplete
				disablePortal
				id="combo-box-demo"
				options={productsName}
				sx={{ width: "500px", margin: 5, background: "yellow" }}
				renderInput={(params) => <TextField {...params} label="Products" />}
			/> */}
			<Box
				component="form"
				sx={{
					"& .MuiTextField-root": { m: 1, width: "25ch" },
				}}
				noValidate
				autoComplete="off"
				pt={5}
			>
				<Box mb={3}>
					Create Products
				</Box>
				<div>
					<TextField
						required
						id="outlined-required"
						label="Name"
						name="nombre"
						value={product.nombre}
						onChange={handleChange}
					/>
					<TextField
						required
						id="outlined-search"
						name="tipo"
						label="Type"
						type="search"
						value={product.tipo}
						onChange={handleChange}
					/>
					<TextField
						required
						id="outlined-required"
						name="precio"
						type="number"
						label="Price"
						value={product.precio}
						onChange={handleChange}
					/>{" "}
					<TextField
						required
						id="outlined-required"
						name="stock"
						type="number"
						label="Stock"
						defaultValue="1"
						value={product.stock}
						onChange={handleChange}
					/>{" "}
					<TextField
						required
						id="outlined-multiline-static"
						name="descripcion"
						label="Description"
						multiline
						rows={4}
						placeholder="Desciption"
						value={product.descripcion}
						onChange={handleChange}
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
			<Box m={2}>
					<Button variant="contained" color="success" size="large" sx={{bgcolor:'olivedrab' , color:'whitesmoke', fontWeight:'bold'}} onClick={handleClick}>Create Product</Button>
			</Box>
		</>
	);
}
