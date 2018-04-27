const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const employees = require('../models/employees');

const employeeRouter = express.Router();
employeeRouter.use(bodyParser.json());

const cors = require('./cors');

employeeRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    console.log('[In get /visitors]');
    employees.find({})
    .then((employees) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(employees);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,(req, res, next) => {
    console.log('[In post /employee]');


    employees.create(req.body)
    .then((employee) => {
        console.log('employee Created ', employee);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(employee);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions,(req, res, next) => {
    console.log('[In delete /employee]');
   
    employees.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});
module.exports = employeeRouter;