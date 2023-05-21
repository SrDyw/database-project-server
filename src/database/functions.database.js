function GetLastIDQuery(table) {
    return `SELECT id FROM "${table}" ORDER by id DESC LIMIT 1`
}

function GetAllTables(table) {
    return `SELECT * FROM "${table}"`
}

function GetAllDeveloper(table, id_name, order, condition, ...columns) {
    let columns_query = ``;

    for(let c in columns) {
        if (columns[c] === null) break;

        columns_query += `,chld.${columns[c]}`;
    }
    console.log(columns);

    return `SELECT d.name, d.feature, d.id ${columns_query} FROM developers d JOIN ${table} chld ON chld.${id_name} = d.id ${condition} ORDER BY d.id ${order}`
}



module.exports = {
    GetLastIDQuery,
    GetAllDeveloper
}