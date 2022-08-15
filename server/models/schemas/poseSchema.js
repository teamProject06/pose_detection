const { Schema } = require("mongoose");
const pose = new Schema(
    {
        name: String,
        time: String,
        poseName: String,
        result:
        {
            good: [{
                part: String,
                feedback: String,
            },],
            bad: [{
                part: String,
                feedback: String,
            },],
            none: String,
        }
    }
);

const Pose = mongoose.model("pose", pose);
module.exports = { Pose };

/*
const { Schema } = require("mongoose");
// const shortId = require("./types/short-id");
module.exports = new Schema(
  {
    // shortId,
    name: String,
    routine: {
        et : true,
        exercise :String,
        number : Number,
    },
    poseResult : {
        poseName : String,
        result : String,
        time : String,

    }
});
*/
/*
{
    // shortId,
    name: String,
    time :  String,
    routine: {
        inActive : true,
        exercise :String,
        number : Number,
    },
    poseResult : {
        poseName : String,
        result : String,
    }
}

*/

/*
name, time
routine : inactive, exercise, number
poseResult : exercise, restult
*/

