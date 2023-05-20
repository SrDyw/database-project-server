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
} = require("./controllers.routes");

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World");
});

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

router.get("/api", (req, res) => {
    res.json([
        { name: "Jose", age: 20 },
        { name: "Armando Casas", age: 30 },
    ]);
});

module.exports = router;
