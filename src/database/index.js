/* eslint-disable no-console */
import knex from 'knex';
import config from '../../knexfile';
import { NODE_ENV } from '../env';
import { logger } from '../common/utils';

const connection = knex(config[NODE_ENV]);

export default connection;

export const getTransaction = () => connection.transaction();

export const authenDatabaseConnection = async () => {
    try {
        await connection.raw('SELECT 1');
        logger.info('Database connected');
    } catch (error) {
        console.log(error);
        logger.error(error);
    }
};
