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
    urlBD = 'mongodb+srv://mguey:3fwMjAYmuY8MgCvO@cluster0-ne9g1.mongodb.net/cafe';
}

process.env.URLBD = urlBD;