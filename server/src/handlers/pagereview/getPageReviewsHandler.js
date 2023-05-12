const getAllPageReview = require("../../controllers/pagereview/getAllPageReview");

const getPageReviewsHandler = async (req, res) => {
  try {
    const allPageReview = await getAllPageReview();
    res.status(200).send(allPageReview);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};

module.exports = getPageReviewsHandler;
