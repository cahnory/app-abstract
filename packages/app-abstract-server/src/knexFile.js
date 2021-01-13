import {
  DATABASE_DATABASE,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_USER,
} from './constants';

export default {
  client: 'mysql2',
  connection: {
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_DATABASE,
  },
  migrations: {
    directory: './database/migrations',
    stub: './database/templates/migration.js',
  },
  seeds: {
    directory: './database/seeds',
    stub: './database/templates/seed.js',
  },
};
