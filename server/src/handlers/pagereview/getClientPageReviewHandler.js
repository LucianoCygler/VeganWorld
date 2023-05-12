const getClientPageReview = require("../../controllers/pagereview/getClientPageReview");

const getClientPageReviewHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const clientPageReview = await getClientPageReview(id);
    res.status(200).send(clientPageReview);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getClientPageReviewHandler;
