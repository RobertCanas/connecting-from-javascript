const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

const args = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name = $1::text OR last_name = $1::text", [args], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    for (let row in result.rows)
      console.log(result.rows[0].first_name + " " + result.rows[0].last_name + ", born " + result.rows[0].birthdate); //output: 1
    client.end();
  });
});