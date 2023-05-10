const { Product } = require("../../db");
//traer todos los productos
//filtrar una vez que los tenga a todos
const orderProductByPrice = (precio) => {
  return precio;
};
const orderProductByTipo = (tipo) => {
  return tipo;
};
const orderProductByName = (nombre) => {
  return nombre;
};

module.exports = {
  orderProductByPrice,
  orderProductByTipo,
  orderProductByName,
};
