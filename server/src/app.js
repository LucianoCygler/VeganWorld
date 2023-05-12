const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes/index.js");
const cors = require("cors");
const server = express();

server.use(express.json());
server.use(morgan("dev"));

server.use(cors());

server.use("/", router);

module.exports = server;
