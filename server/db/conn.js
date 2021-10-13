const mysql = require("mysql");

// connect to database
const cred = {
  host: "localhost",
  user: "root",
  password: "",
  database: "student-dbms",
};

//to use more than one query
let db = mysql.createConnection({ multipleStatements: true });

db = mysql.createConnection(cred);
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql connected...");
});
module.exports = db;
