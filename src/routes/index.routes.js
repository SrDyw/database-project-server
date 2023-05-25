const { Router } = require("express");
const {
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
    getIndustry,
    getGames,
    getEditors,
    getLevelDesigners,
    getUsers,
    getReviews,
    updateUser,
    updateIndustry,
    updateGame,
    updateProgrammer,
    updateDesigner,
    updateLevelDesigner,
    updateEditor,
    deleteReview,
    changeMode,
    getServerMode,
    getTopGames,
    getBestDev,
    getWorstReviews,
    getHighersIndustries,
} = require("./controllers.routes");
const pool = require("../database/index.database");

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World");
});
//#region CREATE
// ** CREATE INDUSTRIES
router.post("/cindustry", createIndustry);

// ** CREATE DEVELOPERS
router.post("/cprogrammer", createProgrammer);
router.post("/cleveldesigner", createLevelDesigner);
router.post("/ceditor", createEditor);
router.post("/cdesigner", createDesigner);

//** CREATE USERS
router.post("/cuser", createUser);
router.post("/creview", createReview);

// ** CREATE GAMES
router.post("/cgame", createGame);
//#endregion CREATE

//#region UPDATE
router.post("/uuser/:id", updateUser);
router.post("/uindustry/:id", updateIndustry);
router.post("/ugame/:id", updateGame);
router.put("/uprogrammer/:id", updateProgrammer);
router.post("/udesigner/:id", updateDesigner);
router.post("/uleveldesigner/:id", updateLevelDesigner);
router.post("/ueditor/:id", updateEditor);
//#endregion UPDATE

//#region READ
router.get("/programmers/:id", getProgrammers);
router.get("/designers/:id", getDesigners);
router.get("/designers/:id", getDesigners);
router.get("/editors/:id", getEditors);
router.get("/leveldesigners/:id", getLevelDesigners);
router.get("/industries/:id", getIndustry);
router.get("/games/:id", getGames);
router.get("/users/:id", getUsers);
router.get("/reviews/:id", getReviews);

router.get("/pool", (req, res)=> {
    return res.status(204).send(pool);
});
//#endregion READ

//#region DELETE

router.post("/dprogrammer/:id", deleteProgrammer);
router.post("/ddesigner/:id", deleteDesigner);
router.post("/dleveldesigner/:id", deleteLevelDesigner);
router.post("/deditor/:id", deleteEditor);
router.post("/duser/:id", deleteUser);
router.post("/dgame/:id", deleteGame);
router.post("/dindustry/:id", deleteIndustry);
router.post("/dreview/:id", deleteReview);

//#endregion DELETE



router.post("/changemode", changeMode);
router.get("/changemode", getServerMode);

router.get("/higersind", getHighersIndustries);
router.get("/topgames", getTopGames);
router.get("/bestdev", getBestDev);
router.get("/criticsreview", getWorstReviews);

router.get("/changemode", getServerMode);


router.get("/api", (req, res) => {
    res.json([
        { name: "Jose", age: 20 },
        { name: "Armando Casas", age: 30 },
    ]);
});

module.exports = router;
