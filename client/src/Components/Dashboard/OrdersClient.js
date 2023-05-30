import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientOrders,
  getAllClients,
  getAllProducts,
  getOrders,
} from "../../redux/actions/actions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const DashOrders = () => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterGeneral, setFilterGeneral] = useState("");
  const [filterClients, setFilterClients] = useState("");
  const [filterProducts, setFilterProducts] = useState(""); 
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [filteredClientOrders, setFilteredClientOrders] = useState([]);

  const dispatch = useDispatch();
 

  const [id, setId] = useState(0);
  const ord = useSelector((state) => state.allOrders);
  const product = useSelector((state) => state.products);
  const ordr = useSelector((state) => state.clientOrders);
  const idClients = useSelector((state) => state.allClients);

  const food = product.map((order) => ({
    description: order.descripcion,
    create: order.createdAt,
    price: order.precio,
    name: order.nombre,
    stock: order.stock,
    img: order.imagen,
    tipe: order.tipo,
    id: order.id,
  }));

  const orders = ord.map((order) => ({
    clientId: order.ClientId,
    facture: order.diereccion,
    Address: order.direccion,
    import: order.importe,
    name: order.productos,
    state: order.estado,
    data: order.fecha,
    id: order.id,
  }));

  const allClientOrders = ordr.map((order) => ({
    facture: order.diereccion,
    Address: order.direccion,
    clientId: order.ClientId,
    order: order.productos,
    import: order.importe,
    state: order.estado,
    data: order.fecha,
    id: order.id,
  }));
  console.log(allClientOrders)
  const [allFilteredClientOrders, setAllFilteredClientOrders] = useState([]);

  const clients = idClients.map((user) => ({
    id: user.id,
    dni: user.dni,
    age: user.edad,
    img: user.imagen,
    email: user.email,
    name: user.nombre,
    city: user.ciudad,
    Delete: user.deleted,
    surname: user.apellido,
    Address: user.direccion,
    Number: user.telefono,
  }));
  
  
  

  useEffect(() => {
    dispatch(getClientOrders(id));
    dispatch(getAllClients());
    const filteredOrders = allClientOrders.filter(
      (order) => order.clientId === id
      )
      setAllFilteredClientOrders(filteredOrders);
  }, [dispatch, id]);



  useEffect(() => {
    dispatch(getOrders());
    dispatch(getAllProducts());
  }, [dispatch]);
  


  
  
  let filteredProducts = food.filter((item) =>
  item.name.includes(filterProducts)
  );
  
  
  
  
  
  const filteredClients = clients.filter(
    (client) =>
    (client.name?.includes(filterGeneral) ||
    client.surname?.includes(filterGeneral) ||
    client.email?.includes(filterGeneral)) &&
    (client.name?.includes(filterClients) ||
    client.surname?.includes(filterClients) ||
    client.email?.includes(filterClients))
    );
    
    let sortedProducts = [...filteredProducts];
    sortedProducts.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else if (sortOrder === 'desc') {
        return b.price - a.price;
      }
      return 0;
    });
    
    const handleClientClick = (clientId) => {
      setId(clientId);
      setFilterGeneral("");
      
      const filteredOrders = allClientOrders.filter(
        (order) => order.clientId === clientId
        );
        
        setAllFilteredClientOrders(filteredOrders);
      };
  
  
      const handleSortAsc = () => {
        setSortOrder("asc");
      };
      
      const handleSortDesc = () => {
        setSortOrder("desc");
      };

 

  return (
    <div>
      <div>
  
        <TextField
       
          label="Customer Filter"
          value={filterClients}
          onChange={(e) => setFilterClients(e.target.value)}
        />

        <Button size="large"  variant="outlined" onClick={handleSortAsc}>
          Pirce Asc
        </Button>
        <Button size="large"  variant="outlined" onClick={handleSortDesc}>
          Price Desc
        </Button>
        <TextField
          label=" Food Filter"
          value={filterProducts}
          onChange={(e) => setFilterProducts(e.target.value)}
        />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Last Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map((client, index) => (
              <TableRow key={index}>
                <TableCell>
                  <button onClick={() => handleClientClick(client.id)}>
                    {client.name}
                  </button>
                </TableCell>
                <TableCell>{client.surname}</TableCell>
                <TableCell>{client.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Client</StyledTableCell>
              <StyledTableCell>Order</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Factura</StyledTableCell>
              <StyledTableCell>State</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Import</StyledTableCell>
              <StyledTableCell>ID</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allFilteredClientOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.clientId}</TableCell>
                <TableCell>
                  {order.order.map((food, index) => {
                     const firstEmptyIndex = food.indexOf(" ");
                     const quantity = food.substring(0, firstEmptyIndex);
                     const product = food.substring(firstEmptyIndex + 1);
                     return (
                       <Grid
                         container
                         direction="row"
                         justifyContent="center"
                         alignItems="center"
                         style={{
                           margin: 5,
                           width: 150,
                           backgroundColor: "#C4B0FF",
                           borderRadius: 20,
                         }}
                         key={index}
                       >
                         <span>{quantity}</span>
                         <span>{product}</span>
                       </Grid>
                     );
                   })}
                </TableCell>
                <TableCell>{order.Address}</TableCell>
                <TableCell>{order.facture}</TableCell>
                <TableCell>{order.state}</TableCell>
                <TableCell>{order.data}</TableCell>
                <TableCell>{order.import}</TableCell>
                <TableCell>{order.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell padding={"5"}>Food</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Stock</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          
          {sortedProducts.map((product, index) => {
  const cantidad = product.quantity;
  const productName = product.name;
  const foodItem = food.find((f) => f.name === productName);
  const price = foodItem ? foodItem.price : "";
  const type = foodItem ? foodItem.tipo : "";
  const description = foodItem ? foodItem.description : "";
  const stock = foodItem ? foodItem.stock : "";

  return (
    <TableRow key={index}>
      <TableCell>{cantidad}</TableCell>
      <TableCell>{productName}</TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>{stock}</TableCell>
    </TableRow>
  );
})}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DashOrders;

















