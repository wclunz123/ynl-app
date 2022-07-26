var mysql = require("mysql");
var connection;


function handleDisconnect() {
    connection = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: "password",
        database: "ynldb"
    });

    connection.connect((err) => {
        if (err) throw err;
    });

    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        else                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)

    });

}
handleDisconnect();

module.exports = connection;