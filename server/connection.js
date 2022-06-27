var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    database: "ynldb"
});

connection.connect((err) => {
    if (err) throw err;
});

module.exports = connection;