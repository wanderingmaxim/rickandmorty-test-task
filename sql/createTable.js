const getCreateTableQuery = () => {
    const query = `CREATE TABLE persons (
        id serial,
        name text,
        data jsonb
    );`;

    return query;
};

module.exports = { getCreateTableQuery };