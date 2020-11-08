import { format } from 'mysql';

const noop = (v) => v;

const doOnce = (cb) => {
  let result;

  return () => {
    if (result === undefined) {
      result = cb();
    }

    return result;
  };
};

const isSqlPart = (part) =>
  !!part && typeof part === 'object' && typeof part.toSqlString === 'function';

const createSqlPart = (toSqlString) => ({
  toSqlString: doOnce(toSqlString),
});

export const raw = (strings, ...values) =>
  createSqlPart(() =>
    strings.reduce((res, string, index) => {
      if (index < values.length) {
        const value = values[index];

        if (isSqlPart(value)) {
          return `${res}${string}${value.toSqlString()}`;
        }

        return `${res}${string}${value}`;
      }

      return `${res}${string}`;
    }, ''),
  );

export const sql = (strings, ...values) =>
  createSqlPart(() => {
    const parameters = [];

    return format(
      strings.reduce((res, string, index) => {
        if (index < values.length) {
          const value = values[index];

          if (isSqlPart(value)) {
            return `${res}${string}${value.toSqlString()}`;
          }

          parameters.push(value);
          return `${res}${string}?`;
        }

        return `${res}${string}`;
      }, ''),
      parameters,
    );
  });

export const sqlString = (...params) => sql(...params).toSqlString();

export const alternation = (parts, glue, group, partHandler = noop) => {
  const sqlParts = [].concat(parts).reduce((acc, part) => {
    const handledPart = partHandler(part);
    if (handledPart) {
      const partString = (isSqlPart(handledPart)
        ? handledPart
        : sql`${handledPart}`
      ).toSqlString();
      if (partString) {
        acc.push(partString);
      }
    }
    return acc;
  }, []);

  switch (sqlParts.length) {
    case 0:
      return '';
    case 1:
      return sqlParts[0];
    default:
      return group ? `(${sqlParts.join(glue)})` : sqlParts.join(glue);
  }
};

export const and = (parts = [], group = true) =>
  createSqlPart(() => alternation(parts, ' AND ', group));

export const or = (parts = [], group = true) =>
  createSqlPart(() => alternation(parts, ' OR ', group));

export const list = (parts = [], group = false) =>
  createSqlPart(() => alternation(parts, ', ', group));

export const where = (parts = []) =>
  createSqlPart(() => {
    const alt = and(parts, false).toSqlString();
    return alt ? `WHERE ${alt}` : '';
  });

export const orderBy = (orders) =>
  createSqlPart(() => {
    const alt = alternation(orders, ', ', false, (order) => {
      if (isSqlPart(order) || !order) {
        return order;
      }

      if (typeof order !== 'object') {
        throw new Error(`sql.orderBy requires an objects with column property`);
      }
      if (!order.column) {
        throw new Error(
          `sql.orderBy requires a valid column, got "${order.column}"`,
        );
      }

      return raw`${
        isSqlPart(order.column) ? order.column : identifier(order.column)
      } ${order.direction === 'DESC' ? 'DESC' : 'ASC'}`;
    });

    return alt ? `ORDER BY ${alt}` : '';
  });

export const limit = ({ limit: value, offset }) =>
  createSqlPart(() => {
    if (offset && !value) {
      throw new Error('limitOffset requires a valid limit if offset is set');
    }

    return value
      ? `LIMIT ${value}${offset ? ` OFFSET ${offset || 0}` : ''}`
      : '';
  });

export const identifier = (identifier) =>
  createSqlPart(() => {
    if (typeof identifier !== 'string') {
      throw new Error(`sql.ident requires a string`);
    }

    return `\`${identifier.split('.').join('`.`')}\``;
  });

export const datetime = (time) =>
  createSqlPart(() => {
    const date = new Date(time);

    return new Date(
      new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString(),
    )
      .toISOString()
      .replace('T', ' ')
      .replace(/\.([0-9]{0,3}).+$/, '.$1');
  });
