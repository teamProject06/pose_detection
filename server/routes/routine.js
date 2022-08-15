const { Router } = require("express");
const router = Router();
const { Routine } = require("./../models/schemas/routineSchema");
const { User } = require("./../models/schemas/userSchemas");

/*___________________루틴 저장페이지______________*/

router.post("routineCreate", async (req,res, next) => {
    const {name, time, routine} = req.body;
    try{
    await Routine.create({
        name,
        time,
        routine,
    });
    res.json({
        result: "루틴 저장이 완료되었습니다.",
    })} catch(e){
        next(e);
    }
});

router.get("/routineCreate",async (req, res, next) => {
    const lists = await Routine.find({}).populate("name");

    res.json(lists);
});
