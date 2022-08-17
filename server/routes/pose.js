const { Router } = require("express");
const router = Router();
const { Pose } = require("./../models/schemas/poseSchema");
const { User } = require("./../models/schemas/userSchema");


/*___________________나의 포즈 불러오기_________________*/
router.get("/", async (req, res, next) => {
    await Pose
    .find({})
    .populate("result") 
    .then(pose => {
       res.json(pose); 
       console.log("pose:",pose);
    });
});


module.exports = router;