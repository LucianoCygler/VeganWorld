import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import ReviewsIcon from "@mui/icons-material/Reviews";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { useDispatch } from "react-redux";
import { ChangeLabel } from "../../redux/actions/actions";

export default function Navigator(props) {
	const categories = [
		{
			id: "Graph",
			icon: <LeaderboardIcon />,
			active: false,
		},
		{ id: "Clients", icon: <PeopleIcon />, active: true },
		{ id: "Products", icon: <DnsRoundedIcon />, active: false },
		{ id: "Reviews", icon: <ReviewsIcon />, active: false },
		{ id: "Orders", icon: <WarehouseIcon />, active: false },
	];

	const item = {
		py: "2px",
		px: 3,
		color: "rgba(255, 255, 255, 0.7)",
		"&:hover, &:focus": {
			bgcolor: "rgba(255, 255, 255, 0.08)",
		},
	};

	const itemCategory = {
		boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
		py: 1.5,
		px: 3,
	};
	const { ...other } = props;
	const dispatch = useDispatch();

	const [labels, setLabels] = useState("");

	const handleLabel = (id) => {
		dispatch(ChangeLabel(id));
		setLabels(id);
	};

	return (
		<Drawer variant="permanent" {...other}>
			<List disablePadding>
				<ListItem
					sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
				>
					VeganWorld
				</ListItem>
				<ListItem sx={{ ...item, ...itemCategory }}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText>Project Overview</ListItemText>
				</ListItem>
				{categories.map(({ id, icon, active }) => (
					<Box key={id} sx={{ bgcolor: "#101F33" }}>
						<ListItem disablePadding key={id}>
							<ListItemButton
								selected={labels === id ? true : false}
								sx={item}
								onClick={() => handleLabel(id)}
							>
								<ListItemIcon>{icon}</ListItemIcon>
								<ListItemText>{id}</ListItemText>
							</ListItemButton>
						</ListItem>
						<Divider sx={{ mt: 2 }} />
					</Box>
				))}
			</List>
		</Drawer>
	);
}
