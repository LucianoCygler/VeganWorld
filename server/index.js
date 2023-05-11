const server = require("./src/app.js");
const { conn } = require("./src/db.js");

require("dotenv").config();

const { PORT } = process.env;

<<<<<<< HEAD
conn.sync({ force: true }).then(() => {
=======
conn.sync({ alter: false }).then(() => {
>>>>>>> 762b5cce1dbdaaff1b8e354c5fb10131ce97b2f0
  server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
});
