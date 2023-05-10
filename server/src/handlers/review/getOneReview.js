const getOneReview = require("../../controllers/review/getOneReview");

const getOneReviewHandler = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send("Porfavor proporcione un id legible para titulo");
      return;
    }
    const review = await getOneReview(id);
    res.status(200).send(review);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};

module.exports = getOneReviewHandler;
