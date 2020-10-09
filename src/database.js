const Database = require("@replit/database");

const URL_DATABASE = process.env.REPLIT_DB_URL;
const db = new Database();
db.key = URL_DATABASE;

module.exports = db;