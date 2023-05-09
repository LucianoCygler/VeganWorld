require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const { Sequelize } = require("sequelize");

const ClientModel = require("./models/Client");
const ProductModel = require("./models/Product");
const OrderModel = require("./models/Order");
const FacturaModel = require("./models/Factura");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

ClientModel(sequelize);
ProductModel(sequelize);
OrderModel(sequelize);
FacturaModel(sequelize);
const { Client, Product, Order, Factura } = sequelize.models;

Client.hasMany(Order);
Order.belongsTo(Client, {
  through: "client_order",
});

Product.belongsToMany(Order, {
  through: "product_order",
});
Order.hasMany(Product);

Order.hasOne(Factura);
Factura.hasOne(Order);

module.exports = {
  ...sequelize.models,

  conn: sequelize,
};
