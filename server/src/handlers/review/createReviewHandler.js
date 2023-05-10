const createReview = require("../../controllers/review/createReview");

const createReviewHandler = async (req, res) => {
  const { titulo, descripcion } = req.body;
  try {
    const newReview = await createReview(titulo, descripcion);
    res.status(200).send(newReview);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};

module.exports = createReviewHandler;
