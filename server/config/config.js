//
/// puerto
//

process.env.PORT = process.env.PORT || 3000;

//
/// Environment
//

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//
/// base de datos
//

let urlBD;

if (process.env.NODE_ENV === 'dev') {
    urlBD = 'mongodb://localhost:27017/cafe';
} else {
    urlBD = process.env.MONGO_URI;
}

process.env.URLBD = urlBD;

//
/// vencimiento del token
//

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//
/// seed de autenticacion
//

process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';

//
/// Gooogle Client ID
//

process.env.CLIENT_ID = process.env.CLIENT_ID || '862789132519-oibf20ppjp77pq2bd7mmams8hka7edna.apps.googleusercontent.com';