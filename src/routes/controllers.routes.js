const pool = require('../database/index.database');
const {Chance} = require('chance');
const message = require('../libs/meesage')
const passwordGenerator = require('password-generator')


// **===================================================
// **             CREATE INDUSTRY
// **===================================================
const createIndustry = async(req, res) => {
    const {name_industry, feature} = req.body;

    function generate(limit) {
        let generated = false
        for(let i = 0; i < limit; i++) {
            const generated_name = Chance().company();
            const generated_ft = Math.floor(1 + Math.random() * 5);

            create(generated_name, generated_ft);
            generated = true;
            
        }

        return generated;
    }

    async function create(name, feature) {
        const result = await pool.query('INSERT INTO "industries"(name_industry, feature) VALUES($1, $2)', [name, feature]);
        console.log(`Create industry ${name} with ${feature} rating`);
    }
    try {
        if (generate(20)) {
            console.log("Generated");
        }
        else {
            create(name_industry, feature);
        }
        res.status(200).send(message("succesfuly"));
    } catch {
        res.status(500).send(message("internal error"));
    }
}

// **===================================================
// **             CREATE USER
// **===================================================
const createUser = async(req, res) => {
    const {username, mail, password} = req.body;

    function generate(limit) {
        let generated = false
        for(let i = 0; i < limit; i++) {
            const generated_name = Chance().name();
            const generated_mail = Chance().email();
            const generated_pass = Chance().bb_pin();

            create(generated_name, generated_mail, generated_pass);
            generated = true;
        }

        return generated;
    }

    async function create(name, mail, pass) {
        const result = await pool.query('INSERT INTO "users"(username, mail, pass) VALUES($1, $2, $3)', [name, mail, pass]);
        console.log(`Create user ${name}, ${mail},  ${pass}`);
    }
    try {
        if (generate(30)) {
            console.log("Generated");
        }
        else {
            create(username, mail, password);
        }
        res.status(200).send(message("succesfuly"));
    } catch {
        res.status(500).send(message("internal error"));
    }
}



module.exports = {
    createIndustry,
    createUser
}