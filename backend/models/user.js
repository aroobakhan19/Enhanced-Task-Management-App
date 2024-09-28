const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
    username:
    {
      type : string,
      required: true,
      unique: true
    },
    email:
    {
      type : string,
      required: true
    },
    password:
    {
      type : string,
      required: true
    },
    tasks:{
        type : mongoose.Types.ObjectId,
        ref: "task",
    }
},
{
Timestamp: true
})
module.exports =mongoose.model("user",userschema)