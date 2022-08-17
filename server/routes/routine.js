const { Router } = require("express");
const router = Router();
const { Routine } = require("./../models/schemas/routineSchema");
const { User } = require("./../models/schemas/userSchema");

/*___________________루틴 저장하기______________*/
router.post("/", async (req,res, next) => {
    const {name, time, routine} = req.body;
    // console.log(req.body,"req.body");
    try{
    await Routine.create({
        name : name,
        time : time,
        routine : routine,
    });
    res.json({
        result: "루틴 저장이 완료되었습니다. 운동을 시작해보세요",
    })
    return;
} catch(e){
        res.status(401).json({
            message: "루틴 저장에 실패했습니다.",
          });
    }
});

/*___________________다른 회원 루틴 불러오기_________________*/
router.get("/", async (req, res, next) => {
    await Routine
    .find({})
    .populate("routine") // key to populate
    .then(routine => {
       res.json(routine); 
      //  console.log(routine);
    });
});

// /*___________________나의 루틴 불러오기_________________*/
// router.get("/", async (req, res, next) => {
//     await Routine
//     .find({})
//     .populate("routine") 
//     .then(routine => {
//        res.json(routine); 
//     });
// });


/* 참고 movie review */
// router.get("/", async (req, res, next) => {

//   // let page = 1;
//   // let perPage = 6; //현재 게시글의 크기(한페이지에 보이는 페이지 개수)

//   if (req.query.page < 1) {
//     next("Please enter a number greater than 1");
//     return;
//   }
//   const page = Number(req.query.page || 1); //req.query.page가 undefined이면 1을 대입
//   const perPage = Number(req.query.perPage || 6); //req.query.page가 undefined이면 6을 대입
//   const total = await Post.countDocuments({});
//   const totalPage = Math.ceil(total / perPage);
//   //mongoose DB에 요청코드 : 페이지 
//   const posts = await Post.find({})
//     .sort({ createdAt: -1 }) //순서 뒤집기(최신데이터(마지막데이터부터) 가져오기)
//     // .skip(perPage * (page - 1)) //0번째 인덱스부터 가져옴 3~8
//     // .limit(perPage) //6개로 한정
//     .populate("author"); //작성한 사용자의 정보가져오기

//   //Post스키마에 해당되는 document들을 find (전부 가져옴)
//   // const posts = await Post.find({}).populate("author");
//   //가져온 데이터를 posts변수에 담아 json 형태로 응답합니다.

//   res.json({ posts, totalPage });
// });


module.exports = router;