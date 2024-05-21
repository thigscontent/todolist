const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: { type: String },
  done: { type: Boolean },
});

module.exports = mongoose.model("Task", taskSchema);
