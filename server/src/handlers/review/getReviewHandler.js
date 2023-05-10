const getAllReview = require("../../controllers/review/getAllReview");
const getReviewByTitulo = require("../../controllers/review/getReviewByTitle");

const getReviewHandler = async (req, res) => {
  const { titulo } = req.query;
  try {
    if (titulo) {
      const review  = await getReviewByTitulo(titulo)
      return res.status(200).send(review) 
    }
    const allReview = await getAllReview();
    res.status(200).send(allReview);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};

module.exports = getReviewHandler;
