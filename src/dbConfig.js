const { Pool } = require('pg');

const pool = new Pool({
    user: 'nhemqdot',
    host: 'babar.db.elephantsql.com',
    database: 'nhemqdot',
    password: 'fkPqvHRH56rss2OCMZSN9pc85rgXQN7m',
});

module.exports = pool;