var mysql = require('mysql');

var verbinding = mysql.createConnection({
  host: "localhost",
  user: "db_gebruikersnaam",
  password: "db_passwoord"
});

verbinding.connect(function(err) {
  if (err) throw err;
  console.log("Verbonden!");
});