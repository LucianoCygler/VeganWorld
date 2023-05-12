const createPageReview = require("../../controllers/pagereview/createPageReview");

const createPageReviewHandler = async (req, res) => {
  const { titulo, descripcion, cliente_id } = req.body;
  try {
    const newPageReview = await createPageReview(
      titulo,
      descripcion,
      cliente_id
    );
    res.status(200).send(newPageReview);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};

module.exports = createPageReviewHandler;
