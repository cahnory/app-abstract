import * as sql from '../sql';

describe('sql.sql', () => {
  it('serializes with escaped non sql part template expressions', () => {
    expect(sql.sqlString`${sql.sql`foo = ${'bar = baz'}`}`).toEqual(
      `foo = 'bar = baz'`,
    );
  });
});

describe('sql.raw', () => {
  it('serializes with non escaped template expressions', () => {
    expect(sql.sqlString`${sql.raw`foo = ${'bar = baz'}`}`).toEqual(
      `foo = bar = baz`,
    );
  });
});

describe('sql.sqlString', () => {
  it('returns a string with escaped non sql part template expressions', () => {
    expect(sql.sqlString`foo = ${'bar = baz'}`).toEqual(`foo = 'bar = baz'`);
  });
});

describe('sql.identifier', () => {
  it('serializes into an identifier', () => {
    expect(sql.sqlString`${sql.identifier('foo')}`).toEqual('`foo`');
  });

  it('split identifiers by dot', () => {
    expect(sql.sqlString`${sql.identifier('foo.bar.baz')}`).toEqual(
      '`foo`.`bar`.`baz`',
    );
  });

  it('throws if identifier is not a string', () => {
    expect(() => sql.sqlString`${sql.identifier(null)}`).toThrow();
    expect(() => sql.sqlString`${sql.identifier(sql.sql``)}`).toThrow();
  });
});

describe('sql.where', () => {
  it('serializes into an empty string if there is no condition', () => {
    expect(
      sql.sqlString`${sql.where([sql.raw``, '', false, null, undefined])}`,
    ).toEqual('');
  });

  it('serializes into WHERE clause if there is a single condition', () => {
    expect(sql.sqlString`${sql.where(sql.sql`foo = "bar"`)}`).toEqual(
      'WHERE foo = "bar"',
    );
    expect(sql.sqlString`${sql.where([sql.sql`foo = "bar"`])}`).toEqual(
      'WHERE foo = "bar"',
    );
  });

  it('serializes into WHERE clause with non grouped AND alternation if there are multiple conditions', () => {
    expect(
      sql.sqlString`${sql.where([sql.sql`foo = "bar"`, sql.sql`baz = "qux"`])}`,
    ).toEqual('WHERE foo = "bar" AND baz = "qux"');
  });
});

describe('sql.and', () => {
  it('serializes into an empty string if there is no condition', () => {
    expect(
      sql.sqlString`${sql.and([sql.raw``, '', false, null, undefined])}`,
    ).toEqual('');
  });

  it('serializes into non grouped condition if there is a single condition', () => {
    expect(sql.sqlString`${sql.and(sql.sql`foo = "bar"`)}`).toEqual(
      'foo = "bar"',
    );
    expect(sql.sqlString`${sql.and([sql.sql`foo = "bar"`])}`).toEqual(
      'foo = "bar"',
    );
  });

  it('serializes into grouped AND alternation if there are multiple conditions', () => {
    expect(
      sql.sqlString`${sql.and([sql.sql`foo = "bar"`, sql.sql`baz = "qux"`])}`,
    ).toEqual('(foo = "bar" AND baz = "qux")');
  });

  it('serializes into non grouped AND alternation if group is false', () => {
    expect(
      sql.sqlString`${sql.and(
        [sql.sql`foo = "bar"`, sql.sql`baz = "qux"`],
        false,
      )}`,
    ).toEqual('foo = "bar" AND baz = "qux"');
  });
});

describe('sql.or', () => {
  it('serializes into an empty string if there is no condition', () => {
    expect(
      sql.sqlString`${sql.or([sql.raw``, '', false, null, undefined])}`,
    ).toEqual('');
  });

  it('serializes into non grouped condition if there is a single condition', () => {
    expect(sql.sqlString`${sql.or(sql.sql`foo = "bar"`)}`).toEqual(
      'foo = "bar"',
    );
    expect(sql.sqlString`${sql.or([sql.sql`foo = "bar"`])}`).toEqual(
      'foo = "bar"',
    );
  });

  it('serializes into grouped OR alternation if there are multiple conditions', () => {
    expect(
      sql.sqlString`${sql.or([sql.sql`foo = "bar"`, sql.sql`baz = "qux"`])}`,
    ).toEqual('(foo = "bar" OR baz = "qux")');
  });

  it('serializes into non grouped OR alternation if group is false', () => {
    expect(
      sql.sqlString`${sql.or(
        [sql.sql`foo = "bar"`, sql.sql`baz = "qux"`],
        false,
      )}`,
    ).toEqual('foo = "bar" OR baz = "qux"');
  });
});

describe('sql.list', () => {
  it('serializes into an empty string if there is no condition', () => {
    expect(
      sql.sqlString`${sql.list([sql.raw``, '', false, null, undefined])}`,
    ).toEqual('');
  });

  it('serializes into non grouped list alternation', () => {
    expect(
      sql.sqlString`${sql.list([sql.sql`foo = "bar"`, sql.sql`baz = "qux"`])}`,
    ).toEqual('foo = "bar", baz = "qux"');
  });

  it('serializes into non grouped list alternation if group is true', () => {
    expect(
      sql.sqlString`${sql.list(
        [sql.sql`foo = "bar"`, sql.sql`baz = "qux"`],
        true,
      )}`,
    ).toEqual('(foo = "bar", baz = "qux")');
  });
});

describe('sql.orderBy', () => {
  it('serializes into an empty string if there is no condition', () => {
    expect(
      sql.sqlString`${sql.orderBy([sql.raw``, '', false, null, undefined])}`,
    ).toEqual('');
  });

  it('serializes into ORDER BY clause if there is a single order', () => {
    expect(sql.sqlString`${sql.orderBy({ column: 'foo' })}`).toEqual(
      'ORDER BY `foo` ASC',
    );
    expect(sql.sqlString`${sql.orderBy([{ column: 'foo' }])}`).toEqual(
      'ORDER BY `foo` ASC',
    );
  });

  it('serializes into ORDER BY clause with non grouped list alternation if there are multiple orders', () => {
    expect(
      sql.sqlString`${sql.orderBy([
        { column: 'foo' },
        { column: sql.identifier('bar'), direction: 'DESC' },
      ])}`,
    ).toEqual('ORDER BY `foo` ASC, `bar` DESC');
  });

  it('throws if there is an order with no column set', () => {
    expect(
      () =>
        sql.sqlString`${sql.orderBy([
          { column: 'foo', direction: 'ASC' },
          { direction: 'ASC' },
        ])}`,
    ).toThrow();
  });

  it('throws if there is a non object order', () => {
    expect(
      () =>
        sql.sqlString`${sql.orderBy([
          { column: 'foo', direction: 'ASC' },
          'something else',
        ])}`,
    ).toThrow();
  });
});

describe('sql.limit', () => {
  it('serializes into an empty string if there is no limit nor offset', () => {
    expect(
      sql.sqlString`${sql.limit([sql.raw``, '', false, null, undefined])}`,
    ).toEqual('');
  });

  it('serializes into LIMIT clause if there is a limit', () => {
    expect(sql.sqlString`${sql.limit({ limit: 25 })}`).toEqual('LIMIT 25');
  });

  it('serializes into LIMIT with OFFSET if there is a limit and an offset', () => {
    expect(sql.sqlString`${sql.limit({ limit: 25, offset: 50 })}`).toEqual(
      'LIMIT 25 OFFSET 50',
    );
  });

  it('throws if an offset is set without limit', () => {
    expect(() => sql.sqlString`${sql.limit({ offset: 25 })}`).toThrow();
  });
});

describe('sql.datetime', () => {
  it('serializes Date to sql format without timezone (UTC)', () => {
    expect(
      sql.sqlString`${sql.datetime(new Date('1985-02-12T05:30:26.766Z'))}`,
    ).toEqual('1985-02-12 06:30:26.766');
  });
});
