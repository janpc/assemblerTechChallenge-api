require("dotenv").config();

const { MONGO_DB_URL, PORT = 4000 } = process.env;

const baseConfig = {
  app: {
    port: PORT || 4000,
  },
  client: {
    url: process.env.CLIENT_URL || "http://localhost:3000",
  },
  db: {
    url: MONGO_DB_URL,
  },
};

module.exports = {
  config: baseConfig,
};
