const deletePageReview = require("../../controllers/pagereview/deletePageReview");

const deletePageReviewHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPageReview = await deletePageReview(id);
    res.status(200).send(deletedPageReview);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};

module.exports = deletePageReviewHandler;
