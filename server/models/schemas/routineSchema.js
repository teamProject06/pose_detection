const { Schema } = require("mongoose");
const routine = new Schema(
    {
        name: String,
        time: Date.now(),
        routine: [{
            isActive : true,
            exercise :String,
            number : Number,
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