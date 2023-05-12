const { Router } = require("express");
const getReviewHandler = require("../handlers/review/getReviewHandler");
const getOneReviewHandler = require("../handlers/review/getOneReview");
const createReviewHandler = require("../handlers/review/createReviewHandler");
const deleteReviewHandler = require("../handlers/review/deleteReviewHandler");
const updateReviewHandler = require("../handlers/review/updateReviewhandler");
const getAllClientReviewsHandler = require("../handlers/review/getAllClientReviewsHandler");
const getAllProductReviewsHandler = require("../handlers/review/getAllProductReviewsHandler");

const reviewRouter = Router();

reviewRouter.get("/", getReviewHandler);

reviewRouter.get("/:id", getOneReviewHandler);

reviewRouter.post("/", createReviewHandler);

reviewRouter.delete("/:id", deleteReviewHandler);

reviewRouter.patch("/:id", updateReviewHandler);

reviewRouter.get("/client/:id", getAllClientReviewsHandler);

reviewRouter.get("/product/:id", getAllProductReviewsHandler);

module.exports = reviewRouter;
