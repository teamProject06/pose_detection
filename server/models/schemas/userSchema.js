const mongoose = require ("mongoose");
const { Schema } = mongoose;
//pw찾을 때 shortId 필요
// const shortId = require("./types/short-id.js");

const user = new Schema(
  {
    // shortId,
    email: String,
    password: String,
    salt : String,
    name: String,
    status: false,
  }
);

const User =  mongoose.model("user", user);
module.exports = { User };