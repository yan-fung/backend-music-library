//Define a database service

const { Pool } = require('pg')

const pool = new Pool()

//This exports an async function that we can use to connect to the database in other parts of our app.
module.exports = {
  query: (text, params) => pool.query(text, params)
}