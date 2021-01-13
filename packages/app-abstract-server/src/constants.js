import dotenv from 'dotenv';

dotenv.config();

export const IS_DEV = process.env.NODE_ENV !== 'production';

export const {
  PORT = 443,
  UNSECURE_PORT = 80,
  DATABASE_HOST = '127.0.0.1',
  DATABASE_USER = 'app_abstract',
  DATABASE_PASSWORD = 'app_abstract',
  DATABASE_DATABASE = 'app_abstract',
  HTTPS_KEY_PATH = IS_DEV ? '../../localhost.key' : null,
  HTTPS_CERT_PATH = IS_DEV ? '../../localhost.crt' : null,
} = process.env;
