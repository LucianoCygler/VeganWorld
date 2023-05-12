require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const { Sequelize } = require("sequelize");

const ClientModel = require("./models/Client");
const ProductModel = require("./models/Product");
const OrderModel = require("./models/Order");
const FacturaModel = require("./models/Factura");
const AdminModel = require("./models/Admin");
const ReviewModel = require("./models/Review");
const PageReviewModel = require("./models/PageReview");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/VeganWorld`,
  {
    logging: false,
    native: false,
  }
);

ClientModel(sequelize);
ProductModel(sequelize);
OrderModel(sequelize);
FacturaModel(sequelize);
AdminModel(sequelize);
ReviewModel(sequelize);
PageReviewModel(sequelize);

const { Client, Product, Order, Factura, Review, PageReview } =
  sequelize.models;

Client.hasMany(Order);
Order.belongsTo(Client);

Product.belongsToMany(Order, {
  through: "product_order",
  foreignKey: "product_id",
  as: "orders",
});
Order.belongsToMany(Product, {
  through: "product_order",
  foreignKey: "order_id",
  as: "products",
});

Order.belongsTo(Factura);
Factura.hasOne(Order);

Client.hasMany(Factura);
Factura.belongsTo(Client);

Product.hasMany(Review);
Review.belongsTo(Product);

Client.hasMany(Review);
Review.belongsTo(Client);

Client.hasMany(PageReview);
PageReview.belongsTo(Client);

module.exports = {
  ...sequelize.models,

  conn: sequelize,
};
