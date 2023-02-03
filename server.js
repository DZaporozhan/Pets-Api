const app = require("./app");
const { connectionToDB } = require("./db/connection");
require("colors");
require("dotenv").config();

const { PORT = 65000, DB_HOST } = process.env;

const startApp = async () => {
  try {
    await connectionToDB(DB_HOST);

    console.log("Database connection successful".blue);

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`.green);
    });
  } catch (e) {
    console.error(`Failed to launch app with error: ${e.message}`);
    process.exit(1);
  }
};

startApp();
