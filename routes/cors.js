const express = require('express');
const cors = require('cors');
const app = express();

//app.use(cors());

//const whitelist = ['http://localhost:3000', 'https://localhost:3443','http://localhost:4200'];


const whitelist = ['http://localhost:3000', 'http://localhost:4200'];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log('[in cors]: '+ req.header('Origin'));

    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
//    corsOptions = { origin: true };
    callback(null, corsOptions);

};


exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);	