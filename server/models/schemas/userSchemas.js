const mongoose = require ("mongoose");
const { Schema } = mongoose;
// const shortId = ...;

const user = new Schema(
  {
    email: String,
    password: String,
    salt : String,
    name: String,
    status: false,
  }
);

const User =  mongoose.model("user", user);
module.exports = { User };