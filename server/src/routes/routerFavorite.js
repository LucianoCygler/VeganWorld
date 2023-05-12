const { Router } = require("express");
const getAllFavoriteHandler = require("../handlers/favorite/getAllFavoriteHandler");
const createFavoriteHandler = require("../handlers/favorite/createFavoriteHandler");
const deleteFavoriteHandler = require("../handlers/favorite/deleteFavoriteHandler");
const getClientFavoritesHandler = require("../handlers/favorite/getClientFavoritesHandler");

const favoriteRouter = Router();

favoriteRouter.get("/", getAllFavoriteHandler);

favoriteRouter.post("/", createFavoriteHandler);

favoriteRouter.delete("/:id", deleteFavoriteHandler);

favoriteRouter.get("/client/:id", getClientFavoritesHandler);

module.exports = favoriteRouter;
