const mongoose = require ("mongoose");
const { Schema } = mongoose;

const routine = new Schema(
    {
        name: String,
        time: Number,
        routine: [{
            id : Number,
            isActive : false,
            name :String,
            count : String,
        },],
    }
);

const Routine =  mongoose.model("routine", routine);
module.exports = { Routine };

/*
name, time
routine : inactive, exercise, number
poseResult : exercise, restult
*/