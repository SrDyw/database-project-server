const pool = require("../database/index.database");


const pendientSkills = [];
const pendientLenguages = [];

const insert_info = {
    id_insert: -1
};

// ** - - - - - - - - - - - - - - -
// ** MAINS QUERYS FOR INSERT
// ** - - - - - - - - - - - - - - -
async function InsertInto(table, ...values) {
    let query = "";
    const query_developer =
        'INSERT INTO "developers"(name, feature) VALUES($1, $2)';
    const developer_query_values = values.slice(0, 2);

    let customQuery = false;
    if (table === "industry") {
        query =
            'INSERT INTO "industries"(name_industry, feature) VALUES($1, $2)';
    }

    // ** ========================= DEVELOPERS SECTION ===============================================
    //#region DEVELOPERS

    //** - - - - - - - - - - - - - - -
    //** PROGRAMMER INSERT */
    //** - - - - - - - - - - - - - - -
    if (table === "programmer") {
        query = 'INSERT INTO "programmer"(id, grade) VALUES($1, $2)';

        const programmer_grade = values[2];
        const values_programmer_leng = values[3];
        const id_industry = values[4];

        console.log(values.slice(0, 2));

        await pool.query(query_developer, developer_query_values);
        await pool.query(query, [++insert_info.id_insert, programmer_grade]);

        await pool.query(
            'INSERT INTO "developers_industries"(id_developer, id_industry) VALUES($1, $2)',
            [insert_info.id_insert, id_industry]
        );

        pendientLenguages.push({
            id_programmer: insert_info.id_insert,
            values_programmer: values_programmer_leng,
        });

        customQuery = true;

        console.log(
            `Create ${table} id -> ${insert_info.id_insert} with values (${developer_query_values}, ${programmer_grade}, lenaguages => ${values_programmer_leng})`
        );

        customQuery = true;
    }

    //** - - - - - - - - - - - - - - -
    //** LEVEL DESIGNER INSERT */
    //** - - - - - - - - - - - - - - -
    if (table === "levels_designer") {
        query = 'INSERT INTO "levels_designer"(id, speciality) VALUES($1, $2)';

        const ld_query_values = [++insert_info.id_insert, values[2]];

        await pool.query(query_developer, developer_query_values);
        await pool.query(query, ld_query_values);

        const id_industry = values[3];
        await pool.query(
            'INSERT INTO "developers_industries"(id_developer, id_industry) VALUES($1, $2)',
            [insert_info.id_insert, id_industry]
        );

        customQuery = true;
        console.log(
            `Create ${table} with values (${developer_query_values} ${ld_query_values}`
        );
        customQuery = true;
    }
    //** - - - - - - - - - - - - - - -
    //** EDITOR INSERT */
    //** - - - - - - - - - - - - - - -
    if (table === "editors") {
        query = 'INSERT INTO "editors"(id, budget, website) VALUES($1, $2, $3)';

        const editor_query_values = [++insert_info.id_insert, values[2], values[3]];

        await pool.query(query_developer, developer_query_values);
        await pool.query(query, editor_query_values);

        const id_industry = values[4];
        await pool.query(
            'INSERT INTO "developers_industries"(id_developer, id_industry) VALUES($1, $2)',
            [insert_info.id_insert + 1, id_industry]
        );

        customQuery = true;
        console.log(
            `Create ${table} with values (${developer_query_values} ${editor_query_values}`
        );
    }

    //** - - - - - - - - - - - - - - -
    //** DESIGNER INSERT */
    //** - - - - - - - - - - - - - - -
    if (table === "designer") {
        query = 'INSERT INTO "designer"(id) VALUES($1)';

        const values_desinger_query = [++insert_info.id_insert];

        await pool.query(query_developer, developer_query_values);
        await pool.query(query, values_desinger_query);

        console.log(values);
        const id_industry = values[3];
        await pool.query(
            'INSERT INTO "developers_industries"(id_developer, id_industry) VALUES($1, $2)',
            [insert_info.id_insert, id_industry]
        );

        console.log(insert_info.id_insert);

        pendientSkills.push({
            id_designer: insert_info.id_insert,
            values_designer: values[2],
        });

        customQuery = true;

        console.log(
            `Create ${table} id -> ${insert_info.id_insert} with values (${developer_query_values} ${values_desinger_query}, skills => ${values[2]})`
        );
    }

    //#endregion DEVELOPERS
    // ** ========================= DEVELOPERS SECTION ===============================================

    if (table === "games") {
        query =
            'INSERT INTO "games"(name, release_date, gender, dimension, id_industry) VALUES($1, $2, $3, $4, $5)';
    }
    if (table === "user") {
        query = 'INSERT INTO "users"(username, mail, pass) VALUES($1, $2, $3)';
    }

    if (table === "reviews") {
        query =
            'INSERT INTO "reviews"(title, creation_date, feature, description, id_user) VALUES($1, $2, $3, $4, $5)';
    }

    if (customQuery === false) {
        const result = await pool.query(query, values);
        console.log(`Create ${table} with values (${values})`);
    }
}
// ** - - - - - - - - - - - - -
// ** MULTIVALUES TABLE INSERT
// ** - - - - - - - - - - - - -
async function UpdateSkillTable() {
    console.log("Updating Skill Table\n");
    while (pendientSkills.length > 0) {
        const current = pendientSkills.pop();

        for (let i = 0; i < current.values_designer.length; i++) {
            await pool.query(
                'INSERT INTO "designer_skills"(id_designer, skill) VALUES($1, $2)',
                [current.id_designer, current.values_designer[i]]
            );
        }
        console.log(
            `Insert at designer ${current.id_designer} skills => ${current.values_designer}`
        );
    }
}

async function UpdateLenguageTable() {
    console.log("Updating Lenguage Table\n");

    console.log(pendientLenguages.length);

    while (pendientLenguages.length > 0) {
        const current = pendientLenguages.pop();

        for (let i = 0; i < current.values_programmer.length; i++) {
            await pool.query(
                'INSERT INTO "programmer_leng"(id_programmer, lenguage) VALUES($1, $2)',
                [current.id_programmer, current.values_programmer[i]]
            );
        }
        console.log(
            `Inserted at programmer ${current.id_programmer} lenguage => ${current.values_programmer}`
        );
    }
}



module.exports = {
    InsertInto,
    UpdateSkillTable,
    UpdateLenguageTable,
    insert_info,
};
