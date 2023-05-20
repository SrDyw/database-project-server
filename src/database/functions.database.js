function GetLastIDQuery(table) {
    return `SELECT id FROM "${table}" ORDER by id DESC LIMIT 1`
}

function GetAllTables(table) {
    return `SELECT * FROM "${table}"`
}


module.exports = {
    GetLastIDQuery
}