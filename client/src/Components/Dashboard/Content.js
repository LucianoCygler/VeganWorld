import React from "react";
import Paper from "@mui/material/Paper";
import TableClient from "./TableClient";
import { useSelector } from "react-redux";
import ReviewsDashboard from "./Reviews";
import Graficos from "../../Graficos/Graficos";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import DashOrders from "./OrdersClient";
import FormProducts from "./FormProduct";

export default function Content() {
  const { Graph, Clients, Products, Reviews, Orders } = useSelector(
    (state) => state.labels
  );


	return (
		<Grid>
			<Paper
				elevation={8}
				sx={{
					maxWidth: "95%",
					margin: "auto",
					overflow: "hidden",
					padding: 4,
					// backgroundColor: "#9799a6",
				}}
			>
				{Clients && <TableClient />}
				{Products && <FormProducts />}
				{Reviews && <ReviewsDashboard />}
				{Graph && <Graficos />}
				{Orders && <DashOrders />}
			</Paper>
		</Grid>
	);
}
