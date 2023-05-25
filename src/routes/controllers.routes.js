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
    const { username, mail, pass } = req.body;
    try {
        if (mainConfig.devMode) {
            await GenerateAutomatlyForTable("users", 30);
        } else {
            await InsertInto("users", username, mail, pass);
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
            let nextid = (await pool.query('SELECT id FROM developers ORDER BY id DESC LIMIT 1')).rows;

            if (nextid.length == 0) {
                nextid = (await pool.query("SELECT nextval('developers_id_seq')")).rows[0].nextval;
                
                nextid = parseInt(nextid) + 1;
                
                // console.log("::::::::::::::::::::Desde cero ", nextid);
            } else {
                nextid = nextid[0].id + 1;
                // console.log("::::::::::::::::::::AASDASD", nextid);
            }

            const result = (await pool.query(GetLastIDQuery("developers")))
                .rows[0];
            const id = result === undefined ? 0 : result.id;
            // console.log(id);
            const gen_res = await GenerateAutomatlyForTable(
                "programmer",
                3,
                nextid
            );

            if (gen_res.message === "succesfuly") await UpdateLenguageTable();
            else return res.send(gen_res);
        } else {
            const { name, feature, grade, lenguage_arr } = req.body;

            const query = {
                text: "SELECT insert_programmer($1, $2, $3, $4)",
                values: [name, feature, grade, lenguage_arr],
            };
            // const dev_insert = await pool.query('INSERT developers SET name = $1, feature = $2', [name, feature]);
            const pro_insert = (await pool.query(query)).rows;
            console.log(pro_insert);
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
            
            let nextid = (await pool.query('SELECT id FROM developers ORDER BY id DESC LIMIT 1')).rows;

            if (nextid.length == 0) {
                nextid = (await pool.query("SELECT nextval('developers_id_seq')")).rows[0].nextval;
                
                nextid = parseInt(nextid) + 1;
                
                // console.log("::::::::::::::::::::Desde cero ", nextid);
            } else {
                nextid = nextid[0].id + 1;
                // console.log("::::::::::::::::::::AASDASD", nextid);
            }
            // const result = (await pool.query(("developers")))
            //     .rows[0];
            // const id = result === undefined ? 0 : result.id;

            const gen_res = await GenerateAutomatlyForTable(
                "levels_designer",
                3,
                nextid
            );
            if (gen_res.message !== "succesfuly") return res.send(gen_res);
        } else {
            const { name, feature, speciality } = req.body;
            
            const query = {
                text: "SELECT insert_level_designer($1, $2, $3)",
                values: [name, feature, speciality],
            };

            const level_designer = await pool.query(query);
        }
        return res.status(200).send(message("succesfuly"));
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
};

// **===================================================
// **             CREATE EDITOR
// **===================================================
const createEditor = async (req, res) => {
    const { name, budget, website } = req.body;

    try {
        if (mainConfig.devMode) {
            let nextid = (await pool.query('SELECT id FROM developers ORDER BY id DESC LIMIT 1')).rows;

            if (nextid.length == 0) {
                nextid = (await pool.query("SELECT nextval('developers_id_seq')")).rows[0].nextval;
                
                nextid = parseInt(nextid) + 1;
                
                // console.log("::::::::::::::::::::Desde cero ", nextid);
            } else {
                nextid = nextid[0].id + 1;
                // console.log("::::::::::::::::::::AASDASD", nextid);
            }

            const result = (await pool.query(GetLastIDQuery("developers")))
                .rows[0];
            const id = result === undefined ? 0 : result.id;

            const gen_res = await GenerateAutomatlyForTable("editors", 30, nextid);

            if (gen_res.message !== "succesfuly") return res.send(gen_res);
        } else {
            const { name, feature, budget, website } = req.body;

            
            const query = {
                text: "SELECT insert_editor($1, $2, $3, $4)",
                values: [name, feature, budget, website],
            };

            const editor_result = await pool.query(query);
        }
        return res.status(200).send(message("succesfuly"));
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
};

// **===================================================
// **             CREATE DESIGNER
// **===================================================
const createDesigner = async (req, res) => {
    const { name, feature, skill } = req.body;

    try {
        if (mainConfig.devMode) {
            let nextid = (await pool.query('SELECT id FROM developers ORDER BY id DESC LIMIT 1')).rows;

            if (nextid.length == 0) {
                nextid = (await pool.query("SELECT nextval('developers_id_seq')")).rows[0].nextval;
                
                nextid = parseInt(nextid) + 1;

                // console.log("NO hay na");
                
                console.log("::::::::::::::::::::Desde cero ", nextid);
            } else {
                nextid = nextid[0].id + 1;
                console.log("::::::::::::::::::::AASDASD", nextid);
            }

            const result = (await pool.query(GetLastIDQuery("developers")))
                .rows[0];
            const id = result === undefined ? 0 : result.id;

            const gen_res = await GenerateAutomatlyForTable("designer", 3, nextid);
            if (gen_res.message !== "succesfuly") return res.send(gen_res);
        } else {
            const { name, feature, skills_arr } = req.body;
            
            const query = {
                text: "SELECT insert_designer($1, $2, $3)",
                values: [name, feature, skills_arr],
            };
            const des_insert = (await pool.query(query)).rows;
        }

        await UpdateSkillTable();
        return res.status(200).send(message("succesfuly"));
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
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
            const result = await InsertInto(
                "games",
                name,
                release_date,
                gender,
                dimension,
                id_industry
            );
        }
        return res.status(200).send(message("succesfuly"));
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
};

// **===================================================
// **             CREATE REVIEW
// **===================================================
const createReview = async (req, res) => {
    const { title, creation_date, feature, description, id_user } = req.body;

    try {
        if (mainConfig.devMode) {
            await GenerateAutomatlyForTable("reviews", 100);
        } else {
            console.log(req.body);
            await InsertInto(
                "reviews",
                title,
                creation_date,
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

// ** ---------------------- READ ROUTES -------------------------------
//#region READ
const getProgrammers = async (req, res) => {
    const { id } = req.params;

    const programmers = await SelectFrom("programmer", id);
    for (let programmer in programmers) {
        console.log(programmers[programmer]);
    }
    return res.json(programmers);
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
    // console.log(`${name}, ${feature}, ${grade}`)
    console.log(req.body);
    return;
    try {
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
    } catch(e) {
        console.log(e);
        return res.status(500).send(sendMessage('error at update', 'error'));
    }
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

// ** ---------------------- DELETE ROUTES -------------------------------
//#region DELETE

const deleteProgrammer = async (req, res) => {
    const { id } = req.params;
    
    try {
        await DelelteFrom("programmer", id);
        res.status(200).send(sendMessage('succesfuly', 'message'))
    } catch(e) {
        console.log(e);
        return res.status(500).send(sendMessage('error at delete', 'error'))
    }
};

const deleteDesigner = async (req, res) => {
    const { id } = req.params;
    
    try {
        await DelelteFrom("designer", id);
        res.status(200).send(sendMessage('succesfuly', 'message'))
    } catch (e){
        console.log(e);
        return res.status(500).send(sendMessage('error at delete', 'error'))
    }
};

const deleteLevelDesigner = async (req, res) => {
    const { id } = req.params;
    
    try {
        await DelelteFrom("levels_designer", id);
        res.status(200).send(sendMessage('succesfuly', 'message'))
    } catch(e) {
        console.log(e);
        return res.status(500).send(sendMessage('error at delete', 'error'))
    }
};

const deleteEditor = async (req, res) => {
    const { id } = req.params;
    
    try {
        await DelelteFrom("editors", id);
        res.status(200).send(sendMessage('succesfuly', 'message'))
    } catch {
        console.log("XD")

        return res.status(500).send(sendMessage('error at delete', 'error'))
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    
    try {
        await DelelteFrom("users", id);
        res.status(200).send(sendMessage('succesfuly', 'message'))
    } catch {
        return res.status(500).send(sendMessage('error at delete', 'error'))
    }
};

const deleteGame = async (req, res) => {
    const { id } = req.params;
    
    try {
        await DelelteFrom("games", id);
        res.status(200).send(sendMessage('succesfuly', 'message'))
    } catch {
        return res.status(500).send(sendMessage('error at delete', 'error'))
    }
};

const deleteIndustry = async (req, res) => {
    const { id } = req.params;
    
    try {
        
        await DelelteFrom("industries", id);
        res.status(200).send(sendMessage('succesfuly', 'message'))
    } catch(e) {
        console.log(e);
        return res.status(500).send(sendMessage('error at delete', 'error'))
    }
};

const deleteReview = async (req, res) => {
    const { id } = req.params;
    
    try {
        
        await DelelteFrom("review", id);
        res.status(200).send(sendMessage('succesfuly', 'message'))
    } catch(e) {
        console.log(e);
        return res.status(500).send(sendMessage('error at delete', 'error'))
    }
};
//#endregion DELETE
// ** ---------------------- DELETE ROUTES -------------------------------

const changeMode = async(req, res) => {
    const { serverMode } = req.body;

    mainConfig.devMode = serverMode === 'off' ? true : false;

    console.log("Autogenerting has been change to -> ", mainConfig.devMode ? 'On' : 'Off');
}

const getServerMode = async(req, res) => {
    res.status(200).send(mainConfig.devMode);
}

const getHighersIndustries = async(req, res) => {
    try {
        const result = (await pool.query(`SELECT higher_industries()`)).rows;
        const result_info = [];

        // console.log(result);

        for(let r in result) {
            result[r].higher_industries = result[r].higher_industries.replace('(', '');
            result[r].higher_industries = result[r].higher_industries.replace(')', '');
            result[r].higher_industries = result[r].higher_industries.replace(')', '');

            const splited = result[r].higher_industries.split(',');

            result_info.push({
                id: splited[0],
                name_industry: splited[1],
                feature: splited[2],
            })
        }

        res.status(200).send(result_info);
    } catch(e) {
        console.log(e)
        res.status(500).send(sendMessage('error'));
    }
}

const getTopGames = async(req, res) => {
    const result = (await pool.query('SELECT * FROM games ORDER BY release_date DESC LIMIT 10')).rows;

    res.status(200).send(result);
}

const getBestDev = async(req, res) => {
    const result_dev = (await pool.query('SELECT * FROM developers WHERE feature = 5')).rows;

    res.status(200).send(result_dev);
}

const getWorstReviews = async(req, res) => {
    const result_revw = (await pool.query('SELECT title, id_user, feature FROM reviews WHERE feature <= 2')).rows
    res.status(200).send(result_revw);
}

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
    deleteReview,

    changeMode,
    getServerMode,

    getHighersIndustries,
    getTopGames,
    getBestDev,
    getWorstReviews
};
