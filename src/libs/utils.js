const { Chance } = require("chance");
const pool = require("../database/index.database");
const { InsertInto, insert_info } = require('../database/querys.database');
const sendMessage = require("./meesage");

// ** - - - - - - - - - - - - - - - - -
// ** FUNCTION FOR AUTOMATIC GENERATION
// ** - - - - - - - - - - - - - - - - -
async function GenerateAutomatlyForTable(table, limit, start_id) {
    if (limit <= 0) return false;

    insert_info.id_insert = start_id;

    console.log(`Generating ${table} Automatly...\n`);

    if (table === "industry") {
        for (let i = 0; i < limit; i++) {
            const generated_name_ind = Chance().company();
            const generated_ft_ind = GenerateRandomOf([1, 2, 3, 4, 5]);
            await InsertInto(table, generated_name_ind, generated_ft_ind);
        }
    }

    if (table === "users") {
        for (let i = 0; i < limit; i++) {
            const generated_name_user = Chance().name().substring(0, 20);
            const generated_mail_user = Chance().email().substring(0, 50);
            const generated_pass_user = Chance().bb_pin().substring(0, 20);

            await InsertInto(
                table,
                generated_name_user,
                generated_mail_user,
                generated_pass_user
            );
        }
    }

    if (table === "programmer") {
        const result = (await GetRandomRowFromTable("industries"));
        if (result === undefined) return sendMessage('error:not_ind')

        let id_industry = result.id_industry;

        for (let i = 0; i < limit; i++) {
            const generated_name_prog = Chance().name().substring(0, 20);
            const generated_ft_prog = GenerateRandomOf([1, 2, 3, 4, 5]);
            const generated_grade_prog = GenerateRandomOf([
                "junior",
                "semisenior",
                "senior",
                "master",
            ]);
            const generated_leng_prog = GenerateListOfValues([
                "java",
                "python",
                "chsarp",
                "javascript",
                "front-end",
                "c++",
                "c",
                "lua",
                "typescript",
                "ruby",
                "kotlin",
                "flutter",
            ]);
            if (i % 5 == 0)
                id_industry = (await GetRandomRowFromTable("industries"))
                    .id_industry;

            console.log(id_industry);

            const insert_res = await InsertInto(
                table,
                generated_name_prog,
                generated_ft_prog,
                generated_grade_prog,
                generated_leng_prog,
                id_industry
            );
        }
    }
    if (table === "levels_designer") {
        const result = (await GetRandomRowFromTable("industries"));
        if (result === undefined) return sendMessage('error:not ind')

        let id_industry = result.id_industry;

        for (let i = 0; i < limit; i++) {
            const generated_name_ld = Chance().name().substring(0, 20);
            const generated_ft_ld = GenerateRandomOf([1, 2, 3, 4, 5]);
            const generated_level_speciality = GenerateRandomOf(["2D", "3D"]);

            if (i % 5 == 0)
                id_industry = (await GetRandomRowFromTable("industries"))
                    .id_industry;

            await InsertInto(
                table,
                generated_name_ld,
                generated_ft_ld,
                generated_level_speciality,
                id_industry
            );
        }
    }
    if (table === "editors") {
        const result = (await GetRandomRowFromTable("industries"));
        if (result === undefined) return sendMessage('error:not ind')

        let id_industry = result.id_industry;
        for (let i = 0; i < limit; i++) {
            const generated_name_editor = Chance().name().substring(0, 20);
            const generated_budget_editor = GenerateRandomRange(0, 10000);
            const generate_feature_editor = GenerateRandomRange(0, 5);
            const generated_website_editor = Chance().url();
            if (i % 5 == 0)
                id_industry = (await GetRandomRowFromTable("industries"))
                    .id_industry;
            await InsertInto(
                table,
                generated_name_editor,
                generate_feature_editor,
                generated_budget_editor,
                generated_website_editor,
                id_industry
            );
        }

        return sendMessage('succesfuly');
    }

    if (table === "designer") {
        const result = (await GetRandomRowFromTable("industries"));
        if (result === undefined) return sendMessage('error:not ind')

        let id_industry = result.id_industry;

        for (let i = 0; i < limit; i++) {
            const generated_name_designer = Chance().name().substring(0, 20);
            const generated_feature_designer = GenerateRandomRange(1, 5);
            const generated_skills_designer = GenerateListOfValues(
                (skills = [
                    "Creatividad",
                    "Adaptabilidad",
                    "Conocimiento Tecnico",
                    "Comunicacion Visual",
                    "Habilidad Artistica",
                ])
            );
            if (i % 5 == 0)
                id_industry = (await GetRandomRowFromTable("industries"))
                    .id_industry;

            await InsertInto(
                table,
                generated_name_designer,
                generated_feature_designer,
                generated_skills_designer,
                id_industry
            );
        }
    }

    if (table === "games") {
        const all_industries_id = (
            await pool.query('SELECT id_industry FROM "industries"')
        ).rows;
        console.log(all_industries_id);
        for (let i = 0; i < limit; i++) {
            const generated_name_gm =
                `Juego: ` + Chance().apple_token().substring(0, 40);
            const generated_release_date_gm = GenerateDate();
            const generated_gender_gm = GenerateRandomOf([
                "plataformas",
                "rpg",
                "shooter",
                "novela grafica",
                "aventuras",
            ]);
            const generated_dimesion_gm = GenerateRandomOf(["2D", "3D"]);
            const generated_industryid_gm =
                all_industries_id[
                    Math.floor(Math.random() * all_industries_id.length)
                ].id_industry;

            await InsertInto(
                table,
                generated_name_gm,
                generated_release_date_gm,
                generated_gender_gm,
                generated_dimesion_gm,
                generated_industryid_gm
            );
        }
    }

    if (table === "reviews") {
        let id_user = (await GetRandomRowFromTable("users")).id;

        for (let i = 0; i < limit; i++) {
            const title = Chance().bb_pin().substring(0, 20);
            const release_date = GenerateDate();
            const feature = GenerateRandomOf([0, 1, 2, 3, 4, 5]);
            const description =
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem et iure fugit sequi rem voluptates qui optio unde aut nesciunt hic est voluptas fugiat, quas veritatis! Accusamus totam odit beatae.";

            if (i % 5 === 0)
                id_user = (await GetRandomRowFromTable("users")).id;

            console.log(id_user);
            await InsertInto(
                table,
                title,
                release_date,
                feature,
                description,
                id_user
            );
        }
    }

    return sendMessage('succesfuly');
}


// ** - - - - - - - - - - - - - - - - -
// ** UTILS FUNCTION
// ** - - - - - - - - - - - - - - - - -
function GenerateRandomOf(values) {
    return values[Math.floor(Math.random() * values.length)];
}

function GenerateRandomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GenerateListOfValues(values) {
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    const limit = Math.ceil(Math.random() * values.length);
    shuffleArray(values);

    return values.slice(0, limit);
}

function GenerateDate() {
    let date = Math.ceil(Math.random() * 30);
    const month = Math.ceil(Math.random() * 12);
    const year = GenerateRandomRange(2019, 2023);

    if (month == 2 && date > 28) date = 28;

    return `${date}-${month}-${year}`;
}

async function GetRandomRowFromTable(table) {
    const rows = (await pool.query(`SELECT * FROM "${table}"`)).rows;
    const random_index = Math.floor(Math.random() * rows.length);
    return rows[random_index];
}

module.exports = {
    GenerateAutomatlyForTable,
    GenerateDate,
    GenerateListOfValues,
    GenerateRandomRange,
};
