const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);


app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '{Usuario} o contrasena incorrectos'
                }
            });
        }

        if (!bycrpt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o {contrasena} incorrectos'
                }
            });
        }

        let token = jwt.sign({
            data: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });




    });

});

//Configuracion de google

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    console.log(payload.name);
    console.log(payload.email);
    console.log(payload.picture);

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    };

}

app.post('/google', async(req, res) => {


    let token = req.body.idtoken;

    let googleUser = await verify(token)
        .catch(err => {
            return res.status(403).json({
                ok: false,
                err: e
            });
        });

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (usuarioDB) {
            if (!usuarioDB.google) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Debe de usar su autenticacion normal'
                    }
                });
            } else {
                let token = jwt.sign({
                    data: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                });

            }
        } else {

            //Grabar en la bd
            let usuario = new Usuario();

            usuario.nombre = googleUser.name;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = 'google-user';

            usuario.save((err, usuarioDB) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                let token = jwt.sign({
                    data: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                });

            });
        }

    });



    res.json({
        usuario: googleUser
    });

});






module.exports = app;