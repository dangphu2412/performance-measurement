require('dotenv').config();

module.exports = {
    development: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        searchPath: ['knex', 'public'],
        migrations: {
            directory: 'src/database/migrations',
            tableName: 'migrations',
        },
        seeds: {
            directory: `${__dirname}/src/database/seeds`,
            tableName: 'seeds',
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: 'src/database/migrations',
            tableName: 'migrations',
        },
        seeds: {
            directory: `${__dirname}/src/database/seeds`,
            tableName: 'seeds',
        }
    },
};
