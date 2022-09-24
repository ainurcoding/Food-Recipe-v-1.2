// database connection

// declare library

const pg = require('pg');
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = require('../helper/env');

// const db = new pg.Pool({
//   host: 'localhost',
//   user: 'postgres',
//   password: '123456789',
//   database: 'db_food_recipe',
//   port: 5432,
// });

  //WITH env version
const db = new pg.Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log('database connected');
});

module.exports = db;
