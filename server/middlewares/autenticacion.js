const jwt = require('jsonwebtoken');




// =======================
// Verificar TOken
//=========================

let verificaToken = (req, res, next) => {

    // .get para los headers
    let token = req.get('token');


    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        //Guarda la informacion del payload

        req.usuario = decoded.data;


        next();

    });


    // res.json({
    //     token
    // });

};

// =============================
// Verificar SI es administrador
//===============================


let verificaAdmin_Role = (req, res, next) => {


    let usuario = req.usuario;

    if (!(usuario.role === 'ADMIN_ROLE')) {
        return res.json({
            ok: false,
            err: 'No es admin'
        });
    }

    next();


};

// =============================
// Verifica token para imagen
//===============================


let verificaTokenImg = (req, res, next) => {

    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        //Guarda la informacion del payload

        req.usuario = decoded.data;


        next();

    });



};





module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenImg
};