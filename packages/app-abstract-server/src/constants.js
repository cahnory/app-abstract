import dotenv from 'dotenv';

dotenv.config();

export const IS_DEV = process.env.NODE_ENV !== 'production';
export const GRAPHQL_ENDPOINT = '/graphql';

export const { PORT = 5000 } = process.env;
