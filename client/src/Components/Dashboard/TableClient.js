import React, { useEffect } from "react";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarFilterButton,
	GridToolbarColumnsButton,
	GridToolbarDensitySelector,
	GridToolbarExport,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllClients } from "../../redux/actions/actions";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";

function ToolbarGrid() {
	const dispatch = useDispatch();

	const clients = useSelector((state) => state.allClients);

	const [switchStates, setSwitchStates] = React.useState({});

	const renderSwitch = (rowId) => {
		const handleChange = (event) => {
			setSwitchStates((prevStates) => ({
				...prevStates,
				[rowId]: event.target.checked,
			}));
		};

		const checked = switchStates[rowId] || false;

		return (
			<FormControlLabel
				control={
					<Switch size="small" checked={checked} onChange={handleChange} />
				}
				inputProps={{ "aria-label": "controlled" }}
				label={checked ? "active" : "desactive"}
			/>
		);
	};

	const columns = [
		{ field: "id", hide: true },
		{ field: "name", headerName: "Name" },
		{ field: "surname", headerName: "Surname", editable: false },
		{ field: "city", headerName: "City", editable: false },
		{
			field: "direction",
			headerName: "Direction",
			width: 120,
			editable: false,
		},
		{ field: "email", headerName: "Email", editable: false },
		{ field: "phone", headerName: "Phone", editable: false },
		{ field: "age", headerName: "Age", editable: false },
		{ field: "dni", headerName: "DNI", editable: false },
		{
			field: "state",
			headerName: "State",
			editable: false,
			renderCell: (params) => renderSwitch(params.row.id),
		},
	];

	const rows = clients.map((client) => {
		return {
			id: client.id,
			name: client.nombre,
			surname: client.apellido,
			city: client.ciudad,
			direction: client.direccion,
			email: client.email,
			phone: client.telefono,
			age: client.edad,
			dni: client.dni,
		};
	});

	function CustomToolbar() {
		return (
			<GridToolbarContainer sx={{ justifyContent:"center"}}>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
				<GridToolbarDensitySelector />
				<GridToolbarExport />
			</GridToolbarContainer>
		);
	}

	useEffect(() => {
		dispatch(getAllClients());
	}, []);

	return (
		<div style={{ height: 500, width: "100%" }}>
			<DataGrid
				sx={{ justifySelf:"center"}}
				rows={rows}
				columns={columns}
				components={{
					Toolbar: CustomToolbar,
				}}
			/>
		</div>
	);
}

export default ToolbarGrid;
