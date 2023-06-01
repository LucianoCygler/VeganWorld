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
import {
  deleteClient,
  getAllClients,
  getAllClientsAdmin,
  updateClient,
} from "../../redux/actions/actions";
import Switch from "@mui/material/Switch";
import { Box, FormControlLabel } from "@mui/material";

function ToolbarGrid() {
  const dispatch = useDispatch();

  const clientsAdmin = useSelector((state) => state.clientsAdmin);
  const deletedClient = useSelector((state) => state.deletedClient);

  const [switchStates, setSwitchStates] = React.useState({});

  const renderSwitch = (row, rowId, deleted) => {
    const handleChange = (event) => {
      const newState = event.target.checked;
      setSwitchStates((prevStates) => ({
        ...prevStates,
        [rowId]: newState,
      }));

      // Actualizar el estado en el backend
      const client = clientsAdmin.find((client) => client.id === rowId);
      if (client) {
        // const updatedClient = { ...client, deleted: !newState };
        dispatch(deleteClient(client.id));
      }
    };

    const checked = switchStates[rowId] || !deleted;

    if (row.deleted === true) {
      return null; // No renderizar el botón si el estado es "Cancelado"
    }
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
    { field: "city", headerName: "City", editable: false, width: 220 },
    {
      field: "direction",
      headerName: "Direction",
      width: 120,
      editable: false,
      width: 220,
    },
    { field: "email", headerName: "Email", editable: false, width: 280 },
    { field: "phone", headerName: "Phone", editable: false, width: 120 },
    { field: "age", headerName: "Age", editable: false },
    { field: "dni", headerName: "DNI", editable: false },
    {
      field: "state",
      headerName: "State",
      editable: false,
      renderCell: (params) =>
        renderSwitch(params.row, params.row.id, params.row.deleted),
    },
  ];

  const rows = clientsAdmin.map((client) => ({
    id: client.id,
    name: client.nombre,
    surname: client.apellido,
    city: client.ciudad,
    direction: client.direccion,
    email: client.email,
    phone: client.telefono,
    age: client.edad,
    dni: client.dni,
    deleted: client.deleted,
  }));

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: "center" }}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  useEffect(() => {
    dispatch(getAllClientsAdmin());
  }, [switchStates]);
  // useEffect(() => {
  //   !clientsAdmin && dispatch(getAllClientsAdmin());
  // }, [deletedClient]);

  return (
    <div style={{ height: 500, minWidth: "100%" }}>
      <Box>List Clients</Box>
      <DataGrid
        sx={{ justifySelf: "center" }}
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
