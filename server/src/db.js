require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);
const { Admin, Cliente, Producto, Pedido, Factura } = sequelize.models;

Cliente.hasMany(Pedido, { foreignKey: "id_cliente" });
Pedido.belongsTo(Cliente, { foreignKey: "id_cliente" });

Producto.hasMany(Pedido, { foreignKey: "id_producto" });
Pedido.hasMany(Producto, { foreignKey: "id_producto" });

Factura.belongsTo(Pedido, { foreignKey: "id_factura" });
Pedido.belongsTo(Factura, { foreignKey: "id_factura" });

module.exports = {
  ...sequelize.models,
  conn,
  sequelize,
};
