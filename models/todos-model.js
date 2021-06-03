const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Todo list schema
const todosSchema = new Schema({
    userId: mongoose.Schema.ObjectId,
    todos: [
      {
        checked: Boolean,
        text: String,
        id: String,
      },
    ],
  });
  const Todos = mongoose.model("Todos", todosSchema);
  
  module.exports = Todos;