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

const args = process.argv[2];

knex.select('first_name', 'last_name', 'birthdate')
  .from('famous_people')
  .where(`first_name`, `${args}`)
  .orWhere(`last_name`, `${args}`)
  .then(function(rows) {
  console.log(rows[0].first_name + " " + rows[0].last_name + ", born " + rows[0].birthdate);
  knex.destroy;
  })
  .then(function () {
    return knex.destroy();
  });