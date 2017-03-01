const settings = require("./settings");

const knex = require('knex')({
  client: 'pg',
  connection: {
  host: settings.hostname,
  user: settings.user,
  password: settings.password,
  database: settings.database,
  port: settings.port,
  ssl: settings.ssl
  }
});

const args = {
  first_name: process.argv[2],
  last_name: process.argv[3],
  birthdate: process.argv[4]
};

knex('famous_people')
  .insert(args)
  .then(function () {
    return knex.destroy();
  });
