const { Product } = require("../../db");
// const cloudinary = require("cloudinary").v2;

// const deleteImage = async (publicId) => {
//   return await cloudinary.uploader.destroy(publicId);
// };

const deleteProduct = async (id, data) => {
  const product = await Product.findOne({ where: { id } });
  if (!product) {
    throw new Error(`Product with the ID ${id} was not found.`);
  }

  // if (Product.imagen?.public_id) {
  //   await deleteImage(Product.imagen.public_id);
  // }

  await product.update(data);
  await product.destroy({ force: false });
  return `The product with ID ${id} was successfully deleted`;
};

module.exports = deleteProduct;
