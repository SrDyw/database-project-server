const pool = require("../database/index.database");
const sendMessage = require("../libs/meesage");
const { GetAllDeveloper } = require("./functions.database");

const pendientSkills = [];
const pendientLenguages = [];

const insert_info = {
    id_insert: -1,
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

        const editor_query_values = [
            ++insert_info.id_insert,
            values[2],
            values[3],
        ];

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
    if (table === "users") {
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

// ** - - - - - - - - - - - - - - -
// ** MAINS QUERYS FOR DELETE
// ** - - - - - - - - - - - - - - -
async function DelelteFrom(table, id) {
    console.log(`---------DELETING ${table.toUpperCase()}----------------`);

    let condition_leng = id === "all" ? `` : `WHERE id_programmer = ${id}`;
    let condition_dev = id === "all" ? `` : `WHERE id = ${id}`;
    //** - - - - - - - - - - - - - - -
    //** PROGRAMMER DELETE */
    //** - - - - - - - - - - - - - - -
    if (table === "programmer") {
        const result_on_lenguages = await pool.query(
            `DELETE FROM "programmer_leng" ` + condition_leng
        );
        const result_on_programmer = await pool.query(
            `DELETE FROM ${table} ` + condition_dev
        );
        const result_on_developers = await pool.query(
            `DELETE FROM "developers" ` + condition_dev
        );

        console.log(`Delete rows in developer -> ${result_on_developers.rowCount}\n
        Delete rows in ${table} -> ${result_on_programmer.rowCount}\n Delete rows in leng ${result_on_lenguages}`);
    }

    //** - - - - - - - - - - - - - - -
    //** DESIGNER DELETE */
    //** - - - - - - - - - - - - - - -
    if (table === "designer") {
        condition_leng = id === "all" ? `` : `WHERE id_designer = ${id}`;

        const result_on_skills = await pool.query(
            `DELETE FROM "designer_skills" ` + condition_leng
        );
        const result_on_designer = await pool.query(
            `DELETE FROM ${table} ` + condition_dev
        );
        const result_on_developers = await pool.query(
            `DELETE FROM "developers" ` + condition_dev
        );

        console.log(
            `Delete rows in developer -> ${result_on_developers.rowCount}\nDelete rows in ${table} -> ${result_on_designer.rowCount}\nDelete rows in skills ${result_on_skills}`
        );
    }
    //** - - - - - - - - - - - - - - -
    //** LEVEL DESIGNER DELETE */
    //** - - - - - - - - - - - - - - -
    if (table === "levels_designer") {
        const result_on_level_designer = await pool.query(
            `DELETE FROM ${table} ` + condition_dev
        );
        const result_on_developers = await pool.query(
            `DELETE FROM "developers" ` + condition_dev
        );

        console.log(
            `Delete rows in developer -> ${result_on_developers.rowCount}\nDelete rows in ${table} -> ${result_on_level_designer.rowCount}`
        );
    }

    //** - - - - - - - - - - - - - - -
    //** EDITOR DELETE */
    //** - - - - - - - - - - - - - - -
    if (table === "editors") {
        condition_leng = id === "all" ? `` : `WHERE id_editor = ${id}`;

        const result_on_editorgame = await pool.query(
            `DELETE FROM "editors_games" ` + condition_leng
        );
        const result_on_editor = await pool.query(
            `DELETE FROM ${table} ` + condition_dev
        );
        const result_on_developers = await pool.query(
            `DELETE FROM "developers" ` + condition_dev
        );

        console.log(
            `Delete rows in developer -> ${result_on_developers.rowCount}\nDelete rows in ${table} -> ${result_on_editor.rowCount}\nDelete rows in editor-game -> ${result_on_editorgame.rowCount}`
        );
    }

    //** - - - - - - - - - - - - - - -
    //** USER DELETE */
    //** - - - - - - - - - - - - - - -
    if (table === "users") {
        condition_leng = id === "all" ? `` : `WHERE id_user = ${id}`;

        const result_on_reviews = await pool.query(
            `DELETE FROM "reviews" ` + condition_leng
        );
        const result_on_user = await pool.query(
            `DELETE FROM ${table} ` + condition_dev
        );

        console.log(
            `Delete rows in ${table} -> ${result_on_user.rowCount}\nDelete rows in reviews -> ${result_on_reviews.rowCount}`
        );
    }

    //** - - - - - - - - - - - - - - -
    //** GAME DELETE */
    //** - - - - - - - - - - - - - - -
    if (table === "games") {
        condition_leng = id === "all" ? `` : `WHERE id_game = ${id}`;
        condition_dev = id === "all" ? `` : `WHERE id_game = ${id}`;

        const result_on_editorgame = await pool.query(
            `DELETE FROM "editors_games" ` + condition_leng
        );
        const result_on_games = await pool.query(
            `DELETE FROM ${table} ` + condition_dev
        );

        console.log(
            `Delete rows in ${table} -> ${result_on_games.rowCount}\nDelete rows in editors-games -> ${result_on_editorgame.rowCount}`
        );
    }

    //** - - - - - - - - - - - - - - -
    //** INDUSTRY DELETE */
    //** - - - - - - - - - - - - - - -
    if (table === "industries") {
        condition_leng = id === "all" ? `` : `WHERE id_industry = ${id}`;
        condition_dev = id === "all" ? `` : `WHERE id_industry = ${id}`;

        const result_on_ind_dev = await pool.query(
            `DELETE FROM "developers_industries" ` + condition_leng
        );
        const result_on_industries = await pool.query(
            `DELETE FROM ${table} ` + condition_dev
        );

        console.log(
            `Delete rows in ${table} -> ${result_on_industries.rowCount}\nDelete rows in develovers-industries -> ${result_on_ind_dev.rowCount}`
        );
    }
}

// ** - - - - - - - - - - - - - - -
// ** MAINS QUERYS FOR READ
// ** - - - - - - - - - - - - - - -
async function SelectFrom(table, id) {
    console.log(`------ ${table.toUpperCase()} -------`);
    if (table === "programmer") {
        let all_developers = [];
        let programmer_leng = [];
        let condition = ``;

        if (id !== "all") {
            condition = `WHERE d.id = ${id}`;
        }

        all_developers = (
            await pool.query(
                GetAllDeveloper("programmer", "id", "DESC", condition, [
                    "grade",
                ])
            )
        ).rows;
        programmer_leng = (
            await pool.query(
                `SELECT pl.lenguage, p.id FROM programmer_leng pl JOIN programmer p ON pl.id_programmer = p.id ${
                    id !== "all" ? `WHERE p.id=${id}` : ""
                } ORDER BY p.id DESC`
            )
        ).rows;

        const result_info = [];
        for (let p in all_developers) {
            const developer = all_developers[p];
            const developer_id = developer.id;
            const lenguages = [];

            while (
                programmer_leng.length > 0 &&
                developer_id === programmer_leng[0].id
            ) {
                const len_temp = programmer_leng.shift();
                lenguages.push(len_temp.lenguage);
            }

            result_info.push({
                id: developer.id,
                name: developer.name,
                feature: developer.feature,
                grade: developer.grade,
                lenguages: lenguages,
            });
        }
        return result_info;

        // const result = await pool.query(
        //     `SELECT * FROM ${table} WHERE id = ${id}`
        // );
        console.log(all_programmers);
        return all_programmers;
    }

    if (table === "designer") {
        let all_developers = [];
        let designer_skills = [];
        let condition = ``;

        if (id !== "all") {
            condition = `WHERE d.id = ${id}`;
        }
        // return []

        all_developers = (
            await pool.query(
                GetAllDeveloper("designer", "id", "DESC", condition, null)
            )
        ).rows;
        designer_skills = (
            await pool.query(
                `SELECT s.skill, s.id_designer FROM designer_skills s JOIN designer ds ON s.id_designer = ds.id ${
                    id !== "all" ? `WHERE s.id_designer=${id}` : ""
                } ORDER BY s.id_designer DESC`
            )
        ).rows;

        const result_info = [];
        for (let p in all_developers) {
            const developer = all_developers[p];
            const developer_id = developer.id;
            const skills = [];

            while (
                designer_skills.length > 0 &&
                developer_id === designer_skills[0].id_designer
            ) {
                const sk_temp = designer_skills.shift();
                skills.push(sk_temp.skill);
            }

            result_info.push({
                id: developer.id,
                name: developer.name,
                feature: developer.feature,
                skills: skills,
            });
        }
        return result_info;

        // const result = await pool.query(
        //     `SELECT * FROM ${table} WHERE id = ${id}`
        // );
        console.log(all_programmers);
        return all_programmers;
    }

    if (table === "editors") {
        let all_developers = [];
        let condition = ``;

        if (id !== "all") {
            condition = `WHERE d.id = ${id}`;
        }
        // return []

        all_developers = (
            await pool.query(
                GetAllDeveloper("editors", "id", "DESC", condition, [
                    "budget",
                    "website",
                ])
            )
        ).rows;

        const result_info = [];
        for (let p in all_developers) {
            const developer = all_developers[p];
            const developer_id = developer.id;

            result_info.push({
                name: developer.name,
                feature: developer.feature,
                id: developer_id,
                budget: developer.budget,
                website: developer.website,
            });
        }
        return result_info;

        // const result = await pool.query(
        //     `SELECT * FROM ${table} WHERE id = ${id}`
        // );
        console.log(all_programmers);
        return all_programmers;
    }

    if (table === "levels_designer") {
        let all_developers = [];
        let condition = ``;

        if (id !== "all") {
            condition = `WHERE d.id = ${id}`;
        }
        // return []

        all_developers = (
            await pool.query(
                GetAllDeveloper("levels_designer", "id", "DESC", condition, [
                    "speciality",
                ])
            )
        ).rows;

        const result_info = [];
        for (let p in all_developers) {
            const developer = all_developers[p];
            const developer_id = developer.id;

            result_info.push({
                name: developer.name,
                feature: developer.feature,
                id: developer_id,
                speciality: developer.speciality,
            });
        }
        return result_info;

        // const result = await pool.query(
        //     `SELECT * FROM ${table} WHERE id = ${id}`
        // );
        console.log(all_programmers);
        return all_programmers;
    }

    if (table === "industries") {
        let all_industries = [];
        let condition = ``;

        if (id !== "all") {
            condition = `WHERE id_industry = ${id}`;
        }
        // return []

        all_industries = (
            await pool.query(`SELECT * FROM industries ${condition}`)
        ).rows;
        return all_industries;
    }

    if (table === "games") {
        let all_games = [];
        let condition = ``;

        if (id !== "all") {
            condition = `WHERE id_game = ${id}`;
        }

        all_games = (
            await pool.query(
                "SELECT id_game, name, release_date, gender, dimension, id_industry FROM games " +
                    condition
            )
        ).rows;
        return all_games;
    }

    if (table === "users") {
        let all_users = [];
        let condition = ``;

        if (id !== "all") {
            condition = `WHERE id = ${id}`;
        }

        all_users = (
            await pool.query(
                "SELECT * FROM users " +
                    condition
            )
        ).rows;
        return all_users;
    }
    if (table === "reviews") {
        let all_reviews = [];
        let condition = ``;

        if (id !== "all") {
            condition = `WHERE id_user = ${id}`;
        }

        all_reviews = (
            await pool.query(
                "SELECT * FROM reviews " +
                    condition
            )
        ).rows;
        return all_reviews;
    }
    return sendMessage("no info", "info");
}

// ** - - - - - - - - - - - - - - -
// ** MAINS QUERYS FOR UPDATE
// ** - - - - - - - - - - - - - - -
async function UpdateFrom(table) {

}


module.exports = {
    InsertInto,
    UpdateSkillTable,
    UpdateLenguageTable,
    insert_info,
    DelelteFrom,
    SelectFrom,
};
