const message = require("../libs/meesage");
const { GenerateAutomatlyForTable } = require("../libs/utils");
const { mainConfig } = require("../config/main.config");
const pool = require("../database/index.database");
const {
    InsertInto,
    UpdateLenguageTable,
    UpdateSkillTable,
    DelelteFrom,
    SelectFrom,
} = require("../database/querys.database");
const { GetLastIDQuery } = require("../database/functions.database");
const sendMessage = require("../libs/meesage");
const { types } = require("pg");

// ** ---------------------- CREATE ROUTES -------------------------------
//#region CREATE
// **===================================================
// **             CREATE INDUSTRY
// **===================================================
const createIndustry = async (req, res) => {
    const { name_industry, feature } = req.body;

    try {
        if (mainConfig.devMode) {
            GenerateAutomatlyForTable("industry", 30);
        } else {
            InsertInto("industry", name_industry, feature);
        }
        res.status(200).send(message("succesfuly"));
    } catch {
        res.status(500).send(message("internal error"));
    }
};

// **===================================================
// **             CREATE USER
// **===================================================
const createUser = async (req, res) => {
    const { username, mail, password } = req.body;
    try {
        if (mainConfig.devMode) {
            GenerateAutomatlyForTable("users", 30);
        } else {
            InsertInto("users", username, mail, password);
        }
        res.status(200).send(message("succesfuly"));
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};

// **===================================================
// **             CREATE PROGRAMMER
// **===================================================
const createProgrammer = async (req, res) => {
    const { name, feature, grade, lenguage, id_industry } = req.body;

    try {
        if (mainConfig.devMode) {
            const nextid = (
                await pool.query("SELECT nextval('developers_id_seq')")
            ).rows[0].nextval;
            console.log(nextid);

            const result = (await pool.query(GetLastIDQuery("developers")))
                .rows[0];
            const id = result === undefined ? 0 : result.id;
            // console.log(id);
            const gen_res = await GenerateAutomatlyForTable(
                "programmer",
                30,
                nextid
            );

            if (gen_res.message === "succesfuly") await UpdateLenguageTable();
            else return res.send(gen_res);
        } else {
            InsertInto(
                "programmer",
                name,
                feature,
                grade,
                lenguage,
                id_industry
            );
        }

        res.status(200).send(message("succesfuly"));
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};

// **===================================================
// **             CREATE LEVEL DESIGNER
// **===================================================
const createLevelDesigner = async (req, res) => {
    const { name, feature, levelspeciality } = req.body;

    try {
        if (mainConfig.devMode) {
            const result = (await pool.query(GetLastIDQuery("developers")))
                .rows[0];
            const id = result === undefined ? 0 : result.id;

            const gen_res = await GenerateAutomatlyForTable(
                "levels_designer",
                30,
                id
            );
            if (gen_res.message !== "succesfuly") return res.send(gen_res);
        } else {
            InsertInto("levels_designer", name, feature, levelspeciality);
        }
        res.status(200).send(message("succesfuly"));
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};

// **===================================================
// **             CREATE EDITOR
// **===================================================
const createEditor = async (req, res) => {
    const { name, budget, website } = req.body;

    try {
        if (mainConfig.devMode) {
            const result = (await pool.query(GetLastIDQuery("developers")))
                .rows[0];
            const id = result === undefined ? 0 : result.id;

            const gen_res = await GenerateAutomatlyForTable("editors", 30, id);

            if (gen_res.message !== "succesfuly") return res.send(gen_res);
        } else {
            InsertInto("editors", name, budget, website);
        }
        res.status(200).send(message("succesfuly"));
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};

// **===================================================
// **             CREATE DESIGNER
// **===================================================
const createDesigner = async (req, res) => {
    const { name, feature, skill } = req.body;

    try {
        if (mainConfig.devMode) {
            const result = (await pool.query(GetLastIDQuery("developers")))
                .rows[0];
            const id = result === undefined ? 0 : result.id;

            const gen_res = await GenerateAutomatlyForTable("designer", 30, id);
            if (gen_res.message !== "succesfuly") return res.send(gen_res);
        } else {
            InsertInto("designer", name, feature, skill);
        }

        await UpdateSkillTable();
        res.status(200).send(message("succesfuly"));
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};

// **===================================================
// **             CREATE GAME
// **===================================================
const createGame = async (req, res) => {
    const { name, release_date, gender, dimension, id_industry } = req.body;

    try {
        if (mainConfig.devMode) {
            await GenerateAutomatlyForTable("games", 30);
        } else {
            InsertInto(
                "games",
                name,
                release_date,
                gender,
                dimension,
                id_industry
            );
        }
        res.status(200).send(message("succesfuly"));
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};

// **===================================================
// **             CREATE REVIEW
// **===================================================
const createReview = async (req, res) => {
    const { title, release_date, feature, description, id_user } = req.body;

    try {
        if (mainConfig.devMode) {
            await GenerateAutomatlyForTable("reviews", 100);
        } else {
            InsertInto(
                "review",
                title,
                release_date,
                feature,
                description,
                id_user
            );
        }
        res.status(200).send(message("succesfuly"));
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};
//#endregion CREATE
// ** ---------------------- CREATE ROUTES -------------------------------

// ** ---------------------- DELETE ROUTES -------------------------------
//#region DELETE

const deleteProgrammer = async (req, res) => {
    const { id } = req.params;
    res.send("Deleting programmer");
    DelelteFrom("programmer", id);
};

const deleteDesigner = async (req, res) => {
    const { id } = req.params;
    res.send("Deleting designer");

    DelelteFrom("designer", id);
};

const deleteLevelDesigner = async (req, res) => {
    const { id } = req.params;
    res.send("Deleting level designer");

    DelelteFrom("levels_designer", id);
};

const deleteEditor = async (req, res) => {
    const { id } = req.params;
    res.send("Deleting editor");

    DelelteFrom("editors", id);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    res.send("Deleting User");

    DelelteFrom("users", id);
};

const deleteGame = async (req, res) => {
    const { id } = req.params;
    res.send("Deleting Game");

    DelelteFrom("games", id);
};

const deleteIndustry = async (req, res) => {
    const { id } = req.params;
    res.send("Deleting Industry");

    DelelteFrom("industries", id);
};
//#endregion DELETE
// ** ---------------------- DELETE ROUTES -------------------------------

// ** ---------------------- READ ROUTES -------------------------------
//#region READ
const getProgrammers = async (req, res) => {
    const { id } = req.params;

    const programmers = await SelectFrom("programmer", id);
    for (let programmer in programmers) {
        console.log(programmers[programmer]);
    }
    return res.send(programmers);
};

const getDesigners = async (req, res) => {
    const { id } = req.params;

    const designers = await SelectFrom("designer", id);
    for (let designer in designers) {
        console.log(designers[designer]);
    }
    return res.send(designers);
};

const getEditors = async (req, res) => {
    const { id } = req.params;

    const editors = await SelectFrom("editors", id);
    for (let editor in editors) {
        console.log(editors[editor]);
    }
    return res.send(editors);
};

const getLevelDesigners = async (req, res) => {
    const { id } = req.params;

    const levelDesigners = await SelectFrom("levels_designer", id);
    for (let level_d in levelDesigners) {
        console.log(levelDesigners[level_d]);
    }
    return res.send(levelDesigners);
};

const getIndustry = async (req, res) => {
    const { id } = req.params;

    const industries = await SelectFrom("industries", id);
    for (let industry in industries) {
        console.log(industries[industry]);
    }
    return res.send(industries);
};
const getGames = async (req, res) => {
    const { id } = req.params;

    const games = await SelectFrom("games", id);
    for (let game in games) {
        console.log(games[game]);
    }
    return res.send(games);
};

const getUsers = async (req, res) => {
    const { id } = req.params;

    const users = await SelectFrom("users", id);
    for (let user in users) {
        console.log(users[user]);
    }
    return res.send(users);
};

const getReviews = async (req, res) => {
    const { id } = req.params;

    const reviews = await SelectFrom("reviews", id);
    for (let review in reviews) {
        console.log(reviews[review]);
    }
    return res.send(reviews);
};

//#endregion READ
// ** ---------------------- READ ROUTES -------------------------------

// ** ---------------------- UPDATE ROUTES -------------------------------
//#region UPDATE
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, mail, pass } = req.body;

    console.log(`----------- Updating User ${id} ------------`);

    const query = {
        text: "SELECT update_user($1, $2, $3, $4)",
        values: [id, username, mail, pass],
    };

    const user = (await pool.query(`SELECT * FROM users WHERE id = ${id}`))
        .rows[0];
    const update_result = await pool.query(query);
    return res.send(`Updated ${update_result.rowCount} rows`);
};
const updateIndustry = async (req, res) => {
    const { id } = req.params;
    const { name_industry, feature } = req.body;

    console.log(`----------- Updating Industry ${id} ------------`);

    const query = {
        text: `SELECT update_industry($1, $2, $3)`,
        values: [id, name_industry, feature],
    };

    const update_result = await pool.query(query);
    return res.send(`Updated ${update_result.rowCount} rows`);
};
const updateGame = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    console.log(`----------- Updating Game ${id} ------------`);

    const query = {
        text: `UPDATE games SET name = $2 WHERE id_game = $1`,
        values: [id, name],
    };

    const update_result = await pool.query(query);
    return res.send(`Updated ${update_result.rowCount} rows`);
};
const updateProgrammer = async (req, res) => {
    const { id } = req.params;
    const { name, feature, grade } = req.body;

    console.log(`----------- Updating Programmer ${id} ------------`);

    const query = {
        text: `UPDATE developers SET name = $2, feature = $3 WHERE id = $1`,
        values: [id, name, feature],
    };

    const update_result = await pool.query(
        "UPDATE programmer SET grade = $1 WHERE id = $2",
        [grade, id]
    );
    if (update_result.rowCount > 0) await pool.query(query);

    return res.send(`Updated ${update_result.rowCount} rows`);
};
const updateLevelDesigner = async (req, res) => {
    const { id } = req.params;
    const { name, feature, speciality } = req.body;

    console.log(`----------- Updating Level Designer ${id} ------------`);

    const query = {
        text: `UPDATE developers SET name = $2, feature = $3 WHERE id = $1`,
        values: [id, name, feature],
    };

    const update_result = await pool.query(
        "UPDATE levels_designer SET speciality = $1 WHERE id = $2",
        [speciality, id]
    );
    if (update_result.rowCount > 0) await pool.query(query);

    return res.send(`Updated ${update_result.rowCount} rows`);
};
const updateDesigner = async (req, res) => {
    const { id } = req.params;
    const { name, feature } = req.body;

    console.log(`----------- Updating Designer ${id} ------------`);

    const query = {
        text: `UPDATE developers SET name = $2, feature = $3 WHERE id = $1`,
        values: [id, name, feature],
    };

    const update_result = await pool.query(
        "SELECT id FROM designer WHERE id = $1",
        [id]
    );
    if (update_result.rowCount > 0) await pool.query(query);

    return res.send(`Updated ${update_result.rowCount} rows`);
};
const updateEditor = async (req, res) => {
    const { id } = req.params;
    const { name, feature, budget, website } = req.body;

    console.log(`----------- Updating Editor ${id} ------------`);

    const query = {
        text: `UPDATE developers SET name = $2, feature = $3 WHERE id = $1`,
        values: [id, name, feature],
    };

    const update_result = await pool.query(
        "UPDATE editors SET budget = $1, website = $2 WHERE id = $3",
        [budget, website, id]
    );
    if (update_result.rowCount > 0) await pool.query(query);

    return res.send(`Updated ${update_result.rowCount} rows`);
};
//#endregion UPDATE
// ** ---------------------- UPDATE ROUTES -------------------------------

module.exports = {
    createIndustry,
    createUser,
    createProgrammer,
    createLevelDesigner,
    createEditor,
    createDesigner,
    createGame,
    createReview,

    deleteProgrammer,
    deleteDesigner,
    deleteLevelDesigner,
    deleteEditor,
    deleteUser,
    deleteGame,
    deleteIndustry,

    getProgrammers,
    getDesigners,
    getEditors,
    getIndustry,
    getGames,
    getLevelDesigners,
    getUsers,
    getReviews,

    updateUser,
    updateIndustry,
    updateGame,
    updateDesigner,
    updateProgrammer,
    updateEditor,
    updateLevelDesigner,
};
