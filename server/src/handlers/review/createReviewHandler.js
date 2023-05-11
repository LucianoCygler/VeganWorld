const createReview = require("../../controllers/review/createReview");

const createReviewHandler = async (req, res) => {
  const { titulo, descripcion, cliente_id, product_id } = req.body;
  try {
    const newReview = await createReview(
      titulo,
      descripcion,
      cliente_id,
      product_id
    );
    res.status(200).send(newReview);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};

module.exports = createReviewHandler;
