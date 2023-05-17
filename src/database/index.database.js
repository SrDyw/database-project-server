const pg = require('pg');
const config = require('./config.database');

const pool = new pg.Pool(config)

pool.connect()
.then(() => console.log('Conexión a la base de datos establecida'))
.catch(err => console.error('Error al conectar a la base de datos\n', err.stack));

module.exports = pool;