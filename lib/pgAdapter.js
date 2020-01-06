const { Pool } = require('pg');

const config = {
    host: process.env.RDS_HOSTNAME ? process.env.RDS_HOSTNAME : process.env.DEV_DB_HOST,
    port: process.env.RDS_PORT ? process.env.RDS_PORT : process.env.DEV_DB_PORT,
    database: process.env.RDS_DB_NAME ? process.env.RDS_DB_NAME : process.env.DEV_DB_DATABASE,
    user: process.env.RDS_USERNAME ? process.env.RDS_USERNAME : process.env.DEV_DB_USER,
    password: process.env.RDS_PASSWORD ? process.env.RDS_PASSWORD : process.env.DEV_DB_PASSWORD,
};

const connectMe = () => {
    const pool = new Pool(config);
    pool.on('connect', () => {
        console.log('connected to the db');
        console.log(config);
    });
    return pool;
}

exports.pgAdapter = connectMe;
