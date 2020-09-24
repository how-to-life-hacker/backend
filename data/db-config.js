const knex = require("knex");

const config = require("../knexfile.js");

const environment = process.env.DB_ENV || "development";

module.exports = knex(config[environment]);

// const knex = require("knex");
// const knexConfig = require("../knexfile.js");
// const environment = process.env.NODE_ENV || "development";

// module.exports = knex(knexConfig[environment]);
