const pg = require('pg');
const config = require('./config.database');

const pool = new pg.Pool(config)

pool.connect()
.then(() => console.log('Database connection established'))
.catch(err => console.error('Error connecting to database\n', err.stack));

module.exports = pool;