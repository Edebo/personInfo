const mysql = require("mysql");
const util = require("util");
require("dotenv").config();

var dbConnection = mysql.createPool({
  connectionLimit: 100,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB
});

dbConnection.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }
  if (connection) {
    console.log("database connected!!!");
    connection.release();
  }
  return;
});

dbConnection.query = util.promisify(dbConnection.query);
export default dbConnection;