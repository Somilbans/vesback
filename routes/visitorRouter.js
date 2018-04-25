const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const visitors = require('../models/visitors');

const visitorRouter = express.Router();
visitorRouter.use(bodyParser.json());

const cors = require('./cors');


visitorRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    console.log('[In get /visitors]');
    visitors.find({})
    .then((visitors) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(visitors);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,(req, res, next) => {
    console.log('[In post /visitors]');
   
    visitors.create(req.body)
    .then((visitor) => {
        console.log('visitor Created ', visitor);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(visitor);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions,(req, res, next) => {
    console.log('[In put /visitors]');
   
    res.statusCode = 403;
    res.end('PUT operation not supported on /visitors');
})
.delete(cors.corsWithOptions,(req, res, next) => {
    console.log('[In delete /visitors]');
   
    visitors.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

/**
visitorRouter.route('/:mobilenum')
.get(request, response, next) => {
    // validate request.mobilenum
    visitors.findOne({'mobilenum': request.mobile}, function(err, resad){
     console.log('into mongoose findone');)
     response.end*('HERE IS YOUR DATA: '+ data);
    // col
}
**/

visitorRouter.route('/:mobileno/contactPersons')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    console.log('[In get /:mobileno/contactPersons] ');
   
    visitors.findOne({mobilenum: req.params.mobileno})
                .then((visitor) => {
                    if(visitor!=null){
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(visitor);
                    }
                    else if (visitor == null) {
                            err = new Error('visitor ' + req.params.mobileno + ' not found');
                            err.status = 404;
                            return next(err);
                    }  
                }, (err) => next(err))
                .catch((err) => next(err));
})
.post(cors.corsWithOptions,(req, res, next) => {
   console.log('[In post /:mobileno/contactPersons] - about to search for: '+req.params.mobileno);
   
   visitors.findOne({mobilenum: req.params.mobileno}).
       then((visitor)=>{
            if(visitor!=null) {
                console.log('[in post /:mobileno/contactPersons]: req.body='+ req.body);
                visitor.contactPersons.push(req.body);
                visitor.save()
                .then((visitor) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(visitor);
                }, (err) => { console.log('in post: /:mobileno/contactPersons - err \n' + err); 
                              next(err)});
        }
        else {
                err = new Error('visitor ' + req.params.mobileno + ' not found');
                err.status = 404;
                return next(err);
            }
        } , (err) => next(err))
            .catch((err) => next(err));
});

/*
visitorRouter.route('/:mobileno/contactPersons/:contactPerson')
// .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
        visitors.findOne({ 
  mobilenum: req.params.mobileno})
     .then((visitor) => {

        if(visitor!=null){
             res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(visitor);
        }
         else if (visitor == null) {
                err = new Error('visitor ' + req.params.mobileno + ' not found');
                err.status = 404;
                return next(err);
            }  
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.cors,(req, res, next) => {
    console.log('in post: /:mobileno/contactPersons/:contactPerson ');
  visitors.findOne({ 
  mobilenum: req.params.mobileno}).
   then((visitor)=>{
        if(visitor!=null) {
           console.log('in post: /:mobileno/contactPersons/:contactPerson '+ req.params.contactPerson);
                visitor.contactPersons.push(JSON.parse(req.params.contactPerson));
                visitor.save()
                .then((visitor) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(visitor);
                }, (err) => { console.log('in post: /:mobileno/contactPersons/:contactPerson - err \n' + err); 
                              next(err)});
        }

            else {
                err = new Error('visitor ' + req.params.mobileno + ' not found');
                err.status = 404;
                return next(err);
            }
        
   } , (err) => next(err))
            .catch((err) => next(err));
    })
.options(cors.cors,(req,res,next)=>{
    console.log('in options: /:mobileno/contactPersons/:contactPerson ');
    return res.statusCode;
});
*/
module.exports = visitorRouter;