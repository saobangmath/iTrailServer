const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordSchema = new Schema({
  nric : {
      type : String,
      required : true,
  },
  scoreA : {
      type : Number,
      required : true,
  },
  errorA : {
      type : Number,
      required : true,
  },
  scoreB : {
    type : Number,
    required : true,
  },
  errorB : {
    type : Number,
    required : true,
  }
}, {timestamps : true});

var Records = mongoose.model("gameplayrecords", recordSchema);

module.exports = Records;
