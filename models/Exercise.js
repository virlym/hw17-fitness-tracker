const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: "Exercise name required"

  },
  quantity: {
    type: Number,
    required: "Exercise quantity required"
  },
  measure: {
    type : String,
    required: "Exercise measure required"
  }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
