import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { prodErrorMap } from "firebase/auth";
import TableClient from "./TableClient";
import FormPropsTextFields from "./FormProduct";
import { useSelector } from "react-redux";
import ReviewsDashboard from "./Reviews";

export default function Content() {
	const {Graph, Clients, Products, Reviews, Orders} = useSelector(state=>state.labels)

	return (
		<Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
			<AppBar
				position="static"
				color="default"
				elevation={0}
				sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
			>

			</AppBar>
			{Clients && <TableClient />}
			{Products && <FormPropsTextFields />	}
			{Reviews && <ReviewsDashboard/>}

			<Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
				No users for this project yet
			</Typography>
		</Paper>
	);
}
