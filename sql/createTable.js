const getCreateTableQuery = () => {
    const query = `CREATE TABLE (
        id serial,
        name text,
        data jsonb
    );`;

    return query;
};

export { getCreateTableQuery };