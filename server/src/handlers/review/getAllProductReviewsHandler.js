const getAllProductReviews = require("../../controllers/review/getAllProductReviews");

const getAllProductReviewsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const allReviews = await getAllProductReviews(id);
    res.status(200).send(allReviews);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getAllProductReviewsHandler;
