const getSqlInsertElementForPerson = (person) => {
    return `(${person.id}, '${person.name}', '${JSON.stringify(person.data)}')`;
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

export { getAddPersonsQuery };