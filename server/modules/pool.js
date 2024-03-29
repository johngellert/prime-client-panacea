require('dotenv').config();
const pg = require('pg');
const Url = require('url-parse');

let config = {};

if (process.env.DATABASE_URL) {
  const params = new Url(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000
  };
} else {
  config = {
    host: 'localhost', 
    port: 5432,
    database: 'panacea',
    max: 10,
    idleTimeoutMillis: 30000
  };
}

const pool = new pg.Pool(config);

pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
