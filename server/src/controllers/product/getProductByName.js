const { Product } = require("../../db");

async function getProductByName(nombre) {
  const product = await Product.findOne({
    where: { nombre },
  });

  if (!product) {
    throw new Error(`The name ${nombre} was not found in the database.`);
  }

  return product;
}

module.exports = getProductByName;
