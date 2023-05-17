const { Router }= require('express');
const {createIndustry, createUser} = require('./controllers.routes');

const router = Router();


router.get('/', (req, res) => {
    res.send("Hello World");
})

router.post('/cindustry', createIndustry);
router.post('/cuser', createUser);

router.get('/api', (req, res) => {
    res.json([{name:'Jose', age: 20}, {name:'Armando Casas', age: 30}]);
})

module.exports = router;