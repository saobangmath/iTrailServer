const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    nric : {
        type : String,
        required : true,
        unique : true,
    }
}, {timestamps : true});

var Users = mongoose.model("users", userSchema);

module.exports = Users;

