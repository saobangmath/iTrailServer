const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/users');

const userRouter = express.Router();
userRouter.use(bodyParser.json());

/* GET users listing. */
userRouter.get('/get/', (req, res, next) => {
  User.find({})
      .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
      }).catch((err) =>{
        res.statusCode = 404;
        console.log(err);
      });
});

/* add new user to the database;*/
userRouter.post('/add/', (req, res, next)=>{
  User.findOne({nric : req.body.nric})
      .then((user) => {
        if (user != null){
          console.log(user);
          res.statusCode = 403;
          res.json({"existed" : true, "message" : "such nric has existed in the database before!"});
        }
        else{
          const newUser = new User({name : req.body.name, nric : req.body.nric});
          User.create(newUser)
              .then((user) => {
                res.statusCode = 200;
                res.json({"existed" : false, "message" : `${user} successfully registered to the database!`});
              })
              .catch((err) => {
                res.statusCode = 404;
                console.log(err);
              });
        }
      }).catch((err) =>{
          res.statusCode = 404;
          console.log(err);
      });
});

module.exports = userRouter;
