import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews, getAllProducts } from "../../redux/actions/actions";

function ReviewsDashboard() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllProducts());
		dispatch(getAllReviews());
	}, []);

	const products = useSelector((state)=> state.products)
	const allReviews = useSelector((state) => state.allReviews);
	

	const MapAllReviews = allReviews.map((rev, index) => {
		const MapProduct = products.filter((product)=> product.id == rev.ProductId)
		console.log(MapProduct);
		return {
			id: rev.id,
			Name: rev.cliente_nombre,
			Title: rev.titulo,
			Description: rev.descripcion,
			Rate: rev.estrellas,
			Date: rev.fecha,
			Product: MapProduct[0].nombre,
		};
	});

	
	return (
		<Box sx={{ height: 250, width: "100%" }}>
			<DataGrid
				columns={[
					{ field: "Name", width: 150, minWidth: 150, maxWidth: 200, resizable: true },
					{ field: "Title", width: 150, resizable: true },
					{ field: "Rate", width: 150, resizable: true },
					{ field: "Date", width: 150, resizable: true },
					{ field: "Product", width: 250, resizable: true },
					{ field: "Description", width: 250, resizable: true },
				]}
				rows={MapAllReviews}
			/>
		</Box>
	);
}

export default ReviewsDashboard;
