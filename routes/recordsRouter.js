const express = require('express')
const bodyParser = require('body-parser')
const User = require('../models/users')
const Record = require('../models/records')

const recordsRouter = express.Router()
recordsRouter.use(bodyParser.json());

/* get all records in the leaderboard*/
recordsRouter.get('/get/',(req, res, next) => {
    Record.find({})
        .then((records) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(records);
        })
        .catch((err) => {
            res.statusCode = 404;
            console.log(err);
        });
});

/* retrieve all attempt of a specific user */
recordsRouter.get('/get/:nric', (req, res, next) => {
    Record.find({'nric' : req.params.nric})
        .then((records) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(records);
        })
        .catch((err) => {
            res.statusCode = 404;
            console.log(err);
        });
});
/* add a new attempt of for a specific user */
recordsRouter.post('/add/', (req, res, next) => {
    const newRecord = new Record({
        nric : req.body.nric,
        scoreA : req.body.scoreA,
        errorA : req.body.errorA,
        scoreB : req.body.scoreB,
        errorB : req.body.errorB
    });

    Record.create(newRecord)
        .then((record) => {
            res.statusCode = 200;
            res.json({"existed" : true, "message" : `record ${record} has successfully registered to the database!`});
        })
        .catch((err) => {
            res.statusCode = 404;
            console.log(err);
        });
});

module.exports = recordsRouter;