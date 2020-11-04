import dotenv from 'dotenv';

dotenv.config();

export const IS_DEV = process.env.NODE_ENV !== 'production';
export const GRAPHQL_ENDPOINT = '/graphql';

export const {
  PORT = 443,
  UNSECURE_PORT = 80,
  HTTPS_KEY_PATH = IS_DEV ? '../../localhost.key' : null,
  HTTPS_CERT_PATH = IS_DEV ? '../../localhost.crt' : null,
} = process.env;
