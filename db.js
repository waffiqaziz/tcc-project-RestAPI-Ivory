const mysql = require("mysql");

// local mysql db connection
const dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ivory",
  multipleStatements: true
});

dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;
