import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../../redux/actions/actions";

function ReviewsDashboard() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllReviews());
	}, []);

	const allReviews = useSelector((state) => state.allReviews);
	const MapAllReviews = allReviews.map((rev, index) => {
		return {
      id: rev.id,
			Name: rev.cliente_nombre,
			Title: rev.titulo,
			Description: rev.descripcion,
			Rate: rev.estrellas,
			Date: rev.fecha,
			Product: rev.product_id,
		};
	});
  console.log(allReviews);
	return (
		<Box sx={{ height: 250, width: "100%" }}>
			<DataGrid
				columns={[
					{ field: "Name" },
					{ field: "Title" },
					{ field: "Description" },
					{ field: "Rate" },
					{ field: "Date" },
					{ field: "Product" },
				]}
				rows={MapAllReviews}
			/>
		</Box>
	);
}

export default ReviewsDashboard;
