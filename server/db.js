const Pool = require("pg").Pool;

module.exports = new Pool({
    user: process.env.DB_USER,
    password: `${process.env.DB_PASSWORD}`,
    host: process.env.DB_HOST,
    port: parseInt(`${process.env.DB_PORT}`),
    database: process.env.DB_NAME
});