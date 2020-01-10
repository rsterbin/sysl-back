const { Pool } = require('pg');
const { assert } = require('chai');

const config = {
    host: process.env.RDS_HOSTNAME ? process.env.RDS_HOSTNAME : process.env.DEV_DB_HOST,
    port: process.env.RDS_PORT ? process.env.RDS_PORT : process.env.DEV_DB_PORT,
    database: process.env.RDS_DB_NAME ? process.env.RDS_DB_NAME : process.env.DEV_DB_DATABASE,
    user: process.env.RDS_USERNAME ? process.env.RDS_USERNAME : process.env.DEV_DB_USER,
    password: process.env.RDS_PASSWORD ? process.env.RDS_PASSWORD : process.env.DEV_DB_PASSWORD,
};

module.exports = {

    connect: async () => (
        client = await (() => (new Promise((resolve, reject) => {
            const pool = new Pool(config);
            pool.connect((err, client, done) => {
                assert.equal(null, err);
                resolve(client);
            });
        })))()
    ),

    close: async (client) => {
        client.release();
        return true;
    }

};
