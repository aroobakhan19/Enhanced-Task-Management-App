const mongoose = require("mongoose");
const taskschema = new mongoose.Schema({
    title:
    {
      type : string,
      required: true,
      unique: true
    },
    desc:
    {
      type : string,
      required: true
    },
    important:
    {
      type : boolean,
      default: false
    },
    complete:
    {
      type : boolean,
      default: false
    },
})

module.exports =mongoose.model("task",taskschema)