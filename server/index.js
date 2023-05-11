const server = require("./src/app.js");
const { conn } = require("./src/db.js");

require("dotenv").config();

const { PORT } = process.env;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
});
