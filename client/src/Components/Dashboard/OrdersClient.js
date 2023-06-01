import React, { useState, useEffect } from "react";
import { CheckCircleOutline, CancelOutlined } from "@mui/icons-material";
import TableContainer from "@mui/material/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  getClientOrders,
  getAllClients,
  getAllProducts,
  getOrders,
} from "../../redux/actions/actions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#6B7178",
  color: "#ffffff",
}));

const DashOrders = () => {
  const dispatch = useDispatch();

  const [allFilteredClientOrders, setAllFilteredClientOrders] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [filterProducts, setFilterProducts] = useState("");
  const [filterGeneral, setFilterGeneral] = useState("");
  const [filterClients, setFilterClients] = useState("");
  const [filterImport, setFilterImport] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [hasOrders, setHasOrders] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [id, setId] = useState(0);

  const idClients = useSelector((state) => state.allClients);
  const ordr = useSelector((state) => state.clientOrders);
  const product = useSelector((state) => state.products);
  const ord = useSelector((state) => state.allOrders);

  const food = product?.map((order) => ({
    description: order?.descripcion,
    create: order?.createdAt,
    details: order?.detalles,
    price: order?.precio,
    name: order?.nombre,
    stock: order?.stock,
    img: order?.imagen,
    tipe: order?.tipo,
    id: order?.id,
  }));

  const orders = ord?.map((order) => ({
    clientId: order?.ClientId,
    facture: order?.diereccion,
    Address: order?.direccion,
    name: order?.productos,
    import: order?.importe,
    state: order?.estado,
    data: order?.fecha,
    id: order?.id,
  }));

  const allClientOrders = ordr?.map((order) => ({
    clientId: order?.ClientId,
    facture: order?.diereccion,
    Address: order?.direccion,
    order: order?.productos,
    import: order?.importe,
    state: order?.estado,
    data: order?.fecha,
    id: order?.id,
  }));

  const clients = idClients?.map((user) => ({
    Address: user?.direccion,
    surname: user?.apellido,
    Number: user.telefono,
    Delete: user.deleted,
    city: user?.ciudad,
    name: user?.nombre,
    email: user?.email,
    img: user?.imagen,
    age: user?.edad,
    dni: user?.dni,
    id: user?.id,
  }));

  const handleClientClick = (clientId) => {
    if (id === clientId && showTable) {
      setId(0);
      setShowTable(false);
    } else {
      setId(clientId);
      setFilterClients("");
      setFilterProducts("");
      setShowTable(true);
      const filteredOrders = allClientOrders?.filter(
        (order) => order?.clientId === clientId
      );
      setAllFilteredClientOrders(filteredOrders);
      const hasOrders = filteredOrders?.length > 0;
      setHasOrders(hasOrders);
    }
  };

  const handleProductHover = (productId) => {
    setHighlightedIndex(productId);
  };

  const handleProductLeave = () => {
    setHighlightedIndex(-1);
  };

  useEffect(() => {
    dispatch(getClientOrders(id));
    dispatch(getAllClients());
    const filteredOrders = allClientOrders?.filter(
      (order) => order.clientId === id
    );
    setAllFilteredClientOrders(filteredOrders);
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getAllProducts());
  }, [dispatch]);

  function OrdersClient({ clients, orders }) {
    const [clientOrders, setClientOrders] = useState([]);

    useEffect(() => {
      const clientOrders = clients?.map((client) => {
        const hasOrders = orders?.some(
          (order) => order?.clientId === client?.id
        );
        return { ...client, hasOrders };
      });
      setClientOrders(clientOrders);
    }, [clients, orders]);
  }

  const filteredClients = clients
    .map((client) => {
      const hasOrders = allClientOrders?.some(
        (order) => order?.clientId === client?.id
      );
      return { ...client, hasOrders };
    })
    .filter(
      (client) =>
        (client.name?.includes(filterGeneral) ||
          client.surname?.includes(filterGeneral) ||
          client.email?.includes(filterGeneral)) &&
        (client.name?.includes(filterClients) ||
          client.surname?.includes(filterClients) ||
          client.email?.includes(filterClients))
    );

  const filteredClientOrders = allFilteredClientOrders.filter(
    (order) =>
      order.facture?.includes(filterClients) ||
      order.Address?.includes(filterClients) ||
      order.state?.includes(filterClients) ||
      order.data?.includes(filterClients) ||
      order.import?.includes(filterClients)
  );

  const filteredProducts = food?.filter((item) =>
    item.name?.includes(filterProducts)
  );

  const handlePriceFilterChange = (e) => {
    setFilterPrice(e.target.value);
  };

  const handleSortOrderChange = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  let sortedProducts = [...filteredProducts];
  sortedProducts?.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else if (sortOrder === "desc") {
      return b?.price - a?.price;
    }
    return 0;
  });

  const handleSortAsc = () => {
    setSortOrder("asc");
  };

  const handleSortDesc = () => {
    setSortOrder("desc");
  };

  const handleNameFilterChange = (e) => {
    setFilterName(e);
  };

  const handleImportFilterChange = (e) => {
    setFilterImport(e);
  };

  const filteredOrders = orders?.filter(
    (order) =>
      order?.name?.includes(filterGeneral) ||
      order?.import?.toString().includes(filterImport) ||
      order?.price?.toString().includes(filterPrice)
  );

  const getClientsWithOrders = (clients, orders) => {
    const clientIdsWithOrders = orders?.map((order) => order.clientId);
    const clientsWithOrders = clients?.filter((client) =>
      clientIdsWithOrders?.includes(client.id)
    );
    return clientsWithOrders;
  };

  const clientsWithOrders = getClientsWithOrders(clients, orders);

  const isClientWithOrders = (clientId) => {
    return clientsWithOrders?.some((client) => client?.id === clientId);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <TextField
          label="Filter by Client"
          variant="outlined"
          fullWidth
          value={filterClients}
          onChange={(e) => setFilterClients(e.target.value)}
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Order</StyledTableCell>
                <StyledTableCell>Client Name</StyledTableCell>
                <StyledTableCell>Surname</StyledTableCell>
                <StyledTableCell>City</StyledTableCell>
                <StyledTableCell>Address</StyledTableCell>
                <StyledTableCell>DNI</StyledTableCell>
                <StyledTableCell>Age</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Number</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients?.map((client, index) => {
                const {
                  id,
                  name,
                  surname,
                  city,
                  Address,
                  dni,
                  age,
                  email,
                  Number,
                } = client;
                const hasOrders = isClientWithOrders(id);

                const verifiedIcon = (
                  <CheckCircleOutline style={{ color: "#16FF00" }} />
                );
                const notAvailableIcon = (
                  <CancelOutlined style={{ color: "red" }} />
                );

                const icon = hasOrders ? verifiedIcon : notAvailableIcon;

                return (
                  <TableRow
                    key={id}
                    onClick={() => handleClientClick(id)}
                    style={{
                      cursor: "pointer",
                      backgroundColor: isClientWithOrders
                        ? "#EEEEEE"
                        : "#ffffff",
                    }}
                  >
                    <TableCell>{icon}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{surname}</TableCell>
                    <TableCell>{city}</TableCell>
                    <TableCell>{Address}</TableCell>
                    <TableCell>{dni}</TableCell>
                    <TableCell>{age}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{Number}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {showTable && (
        <Grid item xs={12} sm={12}>
          {" "}
          <TextField
            label="Filter by name Food Order"
            variant="outlined"
            value={filterName}
            onChange={(e) => handleNameFilterChange(e.target.value)}
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    Quantity_______Food_______Food Price x U
                  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>Facture</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>State</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Import</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allClientOrders?.map((order, index) => {
                  const {
                    clientId,
                    facture,
                    order: orderName,
                    Address,
                    state,
                    data,
                    import: importe,
                    id,
                  } = order;
                  if (
                    filterImport !== "" &&
                    importe !== parseFloat(filterImport)
                  ) {
                    return null;
                  }

                  return (
                    <TableRow key={id} style={{ backgroundColor: "#EEEEEE" }}>
                      <TableCell>
                        <Table>
                          <TableBody>
                            {order?.order?.map((food, index) => {
                              const firstEmptyIndex = food?.indexOf(" ");
                              const quantity = food?.substring(
                                0,
                                firstEmptyIndex
                              );
                              const product = food?.substring(
                                firstEmptyIndex + 1
                              );
                              const productInfo = sortedProducts?.find(
                                (item) => item.name === product
                              );
                              const price = productInfo
                                ? productInfo?.price
                                : null;
                              const img = productInfo ? productInfo?.img : null;
                              const productId = productInfo
                                ? productInfo?.id
                                : null;
                              const total = price * quantity;
                              const isHighlighted =
                                highlightedIndex === productId;

                              if (
                                filterName !== "" &&
                                !product?.includes(filterName)
                              ) {
                                return null;
                              }

                              const handleProductHover = (productId) => {
                                setHighlightedIndex(productId);
                              };

                              const handleProductLeave = () => {
                                setHighlightedIndex(null);
                              };

                              return (
                                <React.Fragment key={index}>
                                  <TableRow
                                    key={order.id}
                                    style={{
                                      backgroundColor: isHighlighted
                                        ? "#EEEEEE"
                                        : "transparent",
                                    }}
                                    onMouseEnter={() =>
                                      handleProductHover(productId)
                                    }
                                    onMouseLeave={handleProductLeave}
                                  >
                                    <TableCell>{quantity}</TableCell>
                                    <TableCell>{product}</TableCell>
                                    <TableCell>{total}</TableCell>
                                    <TableCell>
                                      {isHighlighted && (
                                        <img
                                          src={img}
                                          alt={order?.name}
                                          style={{
                                            position: "absolute",
                                            width: "100px",
                                            border: "1px solid #ccc",
                                            boxShadow: "1px 1px 3px #999",
                                          }}
                                        />
                                      )}
                                    </TableCell>
                                  </TableRow>
                                </React.Fragment>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableCell>
                      <TableCell>{}</TableCell>
                      <TableCell>{facture}</TableCell>
                      <TableCell>{Address}</TableCell>
                      <TableCell>{state}</TableCell>
                      <TableCell>{data}</TableCell>
                      <TableCell>{importe}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {
            <TableContainer component={Paper}>
              <Button onClick={handleSortOrderChange}>
                Filter by Price ({sortOrder})
              </Button>
              <TextField
                label="Filter by Food"
                variant="outlined"
                fullWidth
                value={filterProducts}
                onChange={(e) => setFilterProducts(e.target.value)}
              />
              <Button onClick={handleSortAsc}>Price Ascending</Button>
              <Button onClick={handleSortDesc}>Price Descending</Button>
              <TableContainer component={Paper}></TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Food Name</StyledTableCell>
                    <StyledTableCell>Type</StyledTableCell>
                    <StyledTableCell>Stock</StyledTableCell>
                    <StyledTableCell>Price</StyledTableCell>
                    <StyledTableCell>Description</StyledTableCell>
                    <StyledTableCell>Details</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedProducts?.map((item) => (
                    <TableRow
                      key={item.id}
                      style={{ backgroundColor: "#EEEEEE" }}
                      onMouseEnter={() => handleProductHover(item.id)}
                      onMouseLeave={handleProductLeave}
                    >
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.tipe}</TableCell>
                      <TableCell>{item.stock}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>
                        {highlightedIndex === item?.id && (
                          <img
                            src={item?.img}
                            alt={item?.name}
                            style={{
                              position: "absolute",
                              width: "150px",
                              border: "1px solid #ccc",
                              boxShadow: "1px 1px 3px #999",
                            }}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          }
        </Grid>
      )}
    </Grid>
  );
};

export default DashOrders;
