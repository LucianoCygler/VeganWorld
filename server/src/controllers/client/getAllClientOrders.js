const { Order, Product } = require("../../db");

async function getAllClientOrders(id) {
  // const productos = await Product.findAll({
  //   through: "product_order",
  //   where: {
  //     order_id: id,
  //   },
  //   attributes: ["product_id"],
  // });
  const allClientOrders = await Order.findAll({
    where: { ClientId: id },

    // include: [
    //   {
    //     model: Product,
    //     as: "products",
    //     through: {
    //       model: "product_order",
    //       attributes: ["product_id"],
    //     },
    //   },
    // ],
  });

  return allClientOrders;
}

module.exports = getAllClientOrders;
