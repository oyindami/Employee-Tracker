const mysql = require("mysql2");

//making connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Users MySQL Username
  user: "root",
  // Users MySQL Password
  password: "Ayomiposi1!",
  database: "employees_db",
});
console.log ('connected to the database');

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
