const app = require('./src/app');

// config
const port = process.env.PORT || 4000;


app.listen(port, () => {
    console.log("Listen in port", port)
//   pool.query('INSERT INTO public."Contacts"(id, name, phone) VALUES($1, $2, $3)', [0, 'Hola', 11111]);
})