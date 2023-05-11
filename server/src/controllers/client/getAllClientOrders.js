const { Order, Product } = require("../../db");

async function getAllClientOrders(id) {
  const allClientOrders = await Order.findAll({
    where: { ClientId: id },
    include: [
      {
        model: Product,
        through: {
          model: "product_order",
          attributes: ["order_id", "product_id"],
        },
      },
    ],
  });
  return allClientOrders;
}

module.exports = getAllClientOrders;
