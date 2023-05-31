import React, { useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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
  deleteOrder,
  getAllClients,
  getClientData,
  getOrders,
  getUserDataByEmail,
  updateClient,
  updateOrder,
} from "../../redux/actions/actions";
import Switch from "@mui/material/Switch";
import { Box, FormControlLabel } from "@mui/material";

const RenderActions = (row) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (row, estado) => {
    const newOrder = { id: row.id, estado };
    dispatch(updateOrder(newOrder));
    handleClose();
  };
  if (row.estado === "Cancelado") {
    return null; // No renderizar el botón si el estado es "Cancelado"
  }

  return (
    <div>
      <Button onClick={handleClick}>State</Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleStatusChange(row, "Pendiente")}>
          Pending
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(row, "Preparación")}>
          In Preparation
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(row, "Envío")}>
          Sent
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(row, "Finalizado")}>
          Finished
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(row, "Cancelado")}>
          Cancel Order
        </MenuItem>
      </Menu>
    </div>
  );
};

function ToolbarGrid() {
  const dispatch = useDispatch();

  const allOrders = useSelector((state) => state.allOrders);
  const allClients = useSelector((state) => state.allClients);
  const user = useSelector((state) => state.user);
  const deletedClient = useSelector((state) => state.deletedClient);

  const [switchStates, setSwitchStates] = React.useState({});

  const renderSwitch = (rowId, deleted) => {
    const handleChange = (event) => {
      const newState = event.target.checked;
      setSwitchStates((prevStates) => ({
        ...prevStates,
        [rowId]: newState,
      }));

      // Actualizar el estado en el backend
      const order = allOrders.find((order) => order.id === rowId);
      if (order) {
        //const updatedOrder = { ...order, deleted: !newState };
        dispatch(deleteOrder(order.id));
      }
    };

    const checked = switchStates[rowId] || !deleted;

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
    { field: "estado", headerName: "Name" },
    {
      field: "direccion",
      headerName: "Direction",
      width: 120,
      editable: false,
    },
    { field: "importe", headerName: "Total", editable: false },
    { field: "fecha", headerName: "Date", editable: false },
    { field: "ClientId", headerName: "Client", editable: false },
    {
      field: "clientName",
      headerName: "Client Name",
      editable: false,
    },
    // {
    //   field: "state",
    //   headerName: "State",
    //   editable: false,
    //   renderCell: (params) => renderSwitch(params.row.id, params.row.deleted),
    // },
    {
      field: "actions",
      headerName: "Update State",
      width: 120,
      renderCell: (params) => RenderActions(params.row),
    },
  ];
  const rows = allOrders.map((order) => {
    const client = allClients.find((client) => client.id === order.ClientId);
    const clientName = client ? client.nombre : ""; // Obtén el nombre del cliente o establece una cadena vacía si no se encuentra el cliente
    return {
      id: order.id,
      estado: order.estado,
      direccion: order.direccion,
      productos: order.productos,
      importe: order.importe,
      fecha: order.fecha,
      ClientId: order.ClientId,
      clientName: clientName,
      deleted: order.deleted,
      actions: "actions",
    };
  });

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
    dispatch(getOrders());
    dispatch(getAllClients());
  }, []);
  // useEffect(() => {
  //   !clients && dispatch(getOrders());
  // }, [deletedClient]);

  return (
    <div style={{ height: 500, minWidth: "100%" }}>
      <Box>Orders List</Box>
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
