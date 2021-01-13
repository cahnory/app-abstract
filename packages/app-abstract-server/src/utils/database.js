import knex from 'knex';
import config from '../knexFile';

export const client = knex(config);
