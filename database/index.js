const { Pool } = require('pg');

const config = require('../config');

let pool = null;

const getPool = () => {
    if (!pool) {
        pool = new Pool({
            connectionString: config.get('database_url')
        });
    }
    return pool;
}

const query = (text, params) => {
    pool = getPool();
    return pool.query(text, params);
}

module.exports = {
  query: query
};
