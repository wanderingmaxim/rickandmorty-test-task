const getSqlInsertElementForPerson = (person) => {
    const { id, name, ...data } = person;

    return `(${id}, '${name.replaceAll("'", '')}', '${JSON.stringify(data).replaceAll("'", '')}')`;;
};

const getSqlInsertElementsForPersons = (persons) => {
    const elements = [];

    for (const person of persons) {
        elements.push(getSqlInsertElementForPerson(person));
    }

    return elements.join(', ');
};

const getAddPersonsQuery = (persons) => {
    return `INSERT INTO persons (id, name, data) VALUES
        ${getSqlInsertElementsForPersons(persons)}
    `;
};

module.exports = { getAddPersonsQuery };