const { Router } = require("express");
const getPageReviewsHandler = require("../handlers/pagereview/getPageReviewsHandler");
const getOnePageReviewHandler = require("../handlers/pagereview/getOnePageReviewHandler");
const createPageReviewHandler = require("../handlers/pagereview/createPageReviewHandler");
const deletePageReviewHandler = require("../handlers/pagereview/deletePageReviewHandler");
const updateReviewHandler = require("../handlers/review/updateReviewhandler");
const getClientPageReviewHandler = require("../handlers/pagereview/getClientPageReviewHandler");

const pageReviewRouter = Router();

pageReviewRouter.get("/", getPageReviewsHandler);

pageReviewRouter.get("/:id", getOnePageReviewHandler);

pageReviewRouter.post("/", createPageReviewHandler);

pageReviewRouter.delete("/:id", deletePageReviewHandler);

pageReviewRouter.patch("/:id", updateReviewHandler);

pageReviewRouter.get("/client/:id", getClientPageReviewHandler);

module.exports = pageReviewRouter;
