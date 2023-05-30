import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TableClient from "./TableClient";
import FormPropsTextFields from "./FormProduct";
import { useSelector } from "react-redux";
import ReviewsDashboard from "./Reviews";
import GraficoGanancias from "../../Graficos/GraficoGanancias";
import GraficoReviews from "../../Graficos/GraficoReviews";
import GraficoUsuarios from "../../Graficos/GraficoUsuarios";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import DashOrders from "./OrdersClient";

export default function Content() {
	const { Graph, Clients, Products, Reviews, Orders } = useSelector(
		(state) => state.labels
	);

	return (
		<Grid>
			<Paper
				elevation={8}
				sx={{
					maxWidth: "90%",
					margin: "auto",
					overflow: "hidden",
					padding: 4,
					backgroundColor: "InfoBackground",
				}}
			>
				{Clients && <TableClient />}
				{Products && <FormPropsTextFields />}
				{Reviews && <ReviewsDashboard />}
				{Graph && <GraficoGanancias />}
				{Orders && <DashOrders />}
			</Paper>
		</Grid>
	);
}
