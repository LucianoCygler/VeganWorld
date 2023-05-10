
const { Router } = require("express")
const getReviewHandler = require("../handlers/review/getReviewHandler")
const getOneReviewHandler = require("../handlers/review/getOneReview")
const createReviewHandler = require("../handlers/review/ceateReviewHandler")
const deleteReviewHandler = require("../handlers/review/deleteReviewHandler")
const updateReviewHandler = require("../handlers/review/updateReviewhandler")


const reviewRouter = Router()

reviewRouter.get("/",getReviewHandler)

reviewRouter.get("/:id",getOneReviewHandler)

reviewRouter.post("/",createReviewHandler)

reviewRouter.delete("/:id",deleteReviewHandler)

reviewRouter.patch("/:id",updateReviewHandler)

module.exports = reviewRouter