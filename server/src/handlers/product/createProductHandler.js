const createProduct = require("../../controllers/product/createProduct");
const cloudinary = require("cloudinary").v2;
const { Product } = require("../../db");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});
const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, { folder: "imagenes" });
};

const createProductHandler = async (req, res) => {
  if (req.body?.imagen) {
    const result = await uploadImage(req.body.imagen)
    // const imgNube = result.secure_url;

    Product.imagen = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const { nombre, tipo, descripcion, precio, stock } = req.body;

  try {
    const newProduct = await createProduct(
      nombre,
      tipo,
      descripcion,
      precio,
      stock,
      Product.imagen.url
    );

    res.status(200).send(newProduct);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = createProductHandler;
