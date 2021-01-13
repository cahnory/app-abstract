CREATE DATABASE `app_abstract` DEFAULT CHARACTER SET = `utf8mb4` DEFAULT COLLATE = `utf8mb4_general_ci`;
CREATE USER `app_abstract` @`localhost` IDENTIFIED WITH mysql_native_password BY 'app_abstract';
GRANT
  UPDATE,
  CREATE ROUTINE,
  GRANT OPTION,
  TRIGGER,
  ALTER,
  EXECUTE,
  REFERENCES,
  INSERT,
  CREATE TEMPORARY TABLES,
  CREATE VIEW,
  INDEX,
  SHOW VIEW,
  LOCK TABLES,
  CREATE,
  DELETE,
  EVENT,
  DROP,
  ALTER ROUTINE,
SELECT
  ON `app_abstract`.* TO `app_abstract` @`localhost`;
FLUSH PRIVILEGES
