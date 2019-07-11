const express = require('express');
const app = express();

const bodyParser = require('body-parser');

require('./config/config');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.json('Hello World');
});

app.get('/usuario', (req, res) => {
    res.json('get Usuario');
});

app.post('/usuario', (req, res) => {

    let body = req.body;

    if (!body.nombre) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json(body);
    }

});

app.put('/usuario/:id', (req, res) => {

    console.log(req.params);
    res.json(req.params);
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto 3000`);
});