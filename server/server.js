const express = require('express');
const app = express();
const mongoose = require('mongoose');


const bodyParser = require('body-parser');

require('./config/config');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


// configuracion de rutas
app.use(require('./routes/index'));


app.get('/', (req, res) => {
    res.json('Hello World');
});



//Conexion a base de datos

mongoose.connect(process.env.URLBD, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true }, (err, resp) => {
    if (err) throw new err;

    console.log('BASE DE DATOS ONLINE!!');
});



app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto 3000`);
});