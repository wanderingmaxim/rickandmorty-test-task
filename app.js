const axios = require('axios');
const { env } = require('./env.js');
const { Client } = require('pg');
const { getCreateTableQuery } = require('./sql/createTable.js');
const { getAddPersonsQuery } = require('./sql/addPersons.js');

const dbConfig = {
    user: env.PGUSER,
    password: env.PGPASSWORD,
    host: env.PGHOST,
    database: env.PGDATABASE,
    port: env.PGPORT,
    connectionString: env.DATABASE_URL
};

const dbConnect = async (config) => {
    const newClient = new Client(config);

    await newClient.connect();

    return newClient;
};

const getPersons = async (url) => {
    const { data: result } = await axios.get(url);

    return { nextPage: result.info.next, persons: result.results, result };
};

const startScript = async () => {
    const client = await dbConnect(dbConfig);

    const query = (queryString) => {
        return new Promise((resolve, reject) => {
            client.query(queryString, (err, res) => {
                if (err) reject(err);
                resolve(res);
            });
        });
    };

    await query(getCreateTableQuery());

    let nextPage = 'https://rickandmortyapi.com/api/character';

    while (nextPage !== null) {
        const { nextPage: newNextPage, persons } = await getPersons(nextPage);
        nextPage = newNextPage;

        const myQuery = getAddPersonsQuery(persons);

        console.log(myQuery.slice(9670, 9690));

        await query(myQuery);
    }
    console.log('end');
};

startScript();