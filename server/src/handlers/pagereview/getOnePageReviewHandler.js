const getOnePageReview = require("../../controllers/pagereview/getOnePageReview");

const getOnePageReviewHandler = async (req, res) => {
  try {
    const pageReview = await getOnePageReview(id);
    res.status(200).send(pageReview);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};

module.exports = getOnePageReviewHandler;
