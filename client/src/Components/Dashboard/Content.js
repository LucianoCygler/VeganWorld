import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TableClient from "./TableClient";
import FormPropsTextFields from "./FormProduct";
import { useSelector } from "react-redux";
import ReviewsDashboard from "./Reviews";
import PruebaGrafico from "../../PruebaGrafico/PruebaGrafico";

export default function Content() {
	const { Graph, Clients, Products, Reviews, Orders } = useSelector(
		(state) => state.labels
	);

	return (
		<Paper
			sx={{
				minWidth: 850,
				maxWidth: "90%",
				margin: "auto",
				overflow: "hidden",
				padding: 4
			}}
		>
			<AppBar
				position="static"
				color="default"
				elevation={0}
				sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
			></AppBar>
			{Clients && <TableClient />}
			{Products && <FormPropsTextFields />}
			{Reviews && <ReviewsDashboard />}
			{Graph && <PruebaGrafico />}
		</Paper>
	);
}
