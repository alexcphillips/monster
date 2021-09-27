const mongoose = require("mongoose");
exports.db = () => mongoose.connect("mongodb://localhost:27017/alexGame");

const { Schema } = mongoose;
const enemySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  hp: {
    type: Number,
    min: [1, "Must have at least 1 hp, got {VALUE}"],
    required: true
  },
  atk: {
    type: Number,
    required: true
  },
  spd: {
    type: Number,
    required: true
  }
});

exports.Enemy = mongoose.model("Enemy", enemySchema);
