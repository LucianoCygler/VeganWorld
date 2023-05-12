const getAllClientReviews = require("../../controllers/review/getAllClientReviews");

const getAllClientReviewsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const allReviews = await getAllClientReviews(id);
    res.status(200).send(allReviews);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getAllClientReviewsHandler;
