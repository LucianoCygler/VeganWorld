const { Product } = require("../../db");
async function getProductByName(nombre) {
  const product = await Product.findOne({
    where: {  nombre },
  });

  if ( !product ) {throw new Error(`El nombre ${nombre} no se encontró en la base de datos`)};

  return product;
}

module.exports = getProductByName;