const { Chance } = require("chance");
const message = require("../libs/meesage");
const passwordGenerator = require("password-generator");
const {
    // InsertInto,
    GenerateAutomatlyForTable,
    // UpdateSkillTable,
    // UpdateLenguageTable,
} = require("../libs/utils");
const { mainConfig } = require("../config/main.config");
const pool = require("../database/index.database");
const {InsertInto, UpdateLenguageTable, UpdateSkillTable} = require("../database/querys.database");
const { GetLastIDQuery } = require("../database/functions.database");

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
            const id = (await pool.query(GetLastIDQuery("developers"))).rows[0].id;
            await GenerateAutomatlyForTable("programmer", 1, id);

            await UpdateLenguageTable();
        } else {
            InsertInto("programmer", name, feature, grade, lenguage, id_industry);
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
            const id = (await pool.query(GetLastIDQuery("developers"))).rows[0].id;
            GenerateAutomatlyForTable("levels_designer", 30, id);
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
            const id = (await pool.query(GetLastIDQuery("developers"))).rows[0].id;
            GenerateAutomatlyForTable("editors", 30, id);
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
            const id = (await pool.query(GetLastIDQuery("developers"))).rows[0].id;
            await GenerateAutomatlyForTable("designer", 30, id);
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
            InsertInto("games", name, release_date, gender, dimension, id_industry);
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
            InsertInto("review", title, release_date, feature, description, id_user);
        }
        res.status(200).send(message("succesfuly"));
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};



module.exports = {
    createIndustry,
    createUser,
    createProgrammer,
    createLevelDesigner,
    createEditor,
    createDesigner,
    createGame,
    createReview
};
