const knex = require("knex");

const knex_config = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: "password",
        database: 'dab'
    }
};
const knexInstance = knex(knex_config)

exports.knexInstance = knexInstance;