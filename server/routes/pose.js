const { Router } = require("express");
const { Routine } = require("../models/schemas/routineSchema");
const router = Router();
const { Pose } = require("./../models/schemas/poseSchema");
const { User } = require("./../models/schemas/userSchema");

/*_________________pose feedback 저장하기_______________*/
router.post("/", async (req, res, next) => {
    const{name, poseName, result} = req.body;
    try{
        let now = timeString();
        /*___________________function____________________ */
        let serverResult = {
            "Good":[],
            "Bad" :[],
            "None" : []
        };
        for (let i in result) {
            let part = result[i].part;
            let feedback = result[i].feedback;
            if (result[i].state === 'Good') {
                serverResult.Good.push({
                    "part": part,
                    "feedback": feedback,
                })
            }
            else if (result[i].state === 'Bad') {
                serverResult.Bad.push({
                    "part": part,
                    "feedback": feedback,
                })
            }
            else if (result[i].state === 'None') {
                serverResult.None.push({
                    "part": part,
                    "feedback": feedback,
                })
            }
        }/*____________________function______________________ */
        
        await Pose.create({
            name : name,
            time : now,
            poseName : poseName,
            result : serverResult
        });
        // Pose.result.good.push(finResult.good);
        // Pose.result.bad.push(finResult.bad);
        // Pose.result.noneFeedback.push(finResult.noneFeedback);
        res.json({
            result : "운동 완료했습니다! 마이페이지에서 피드백을 확인해 보세요.",
        })
        return;
    } catch(e) {
        res.status(401).json({
            message: "자세 교정 피드백을 저장하지 못했습니다.",
          });
    }
});

/*__________________poseFeedback 불러오기__________________*/
router.get("/:name/mypage", async (req, res, next) => {
    const {name} = req.params;

    try{
    await Pose
    .find({name})
    .populate("result") // key to populate
    .then(result => {
       res.json(result); 
       console.log(result);
    });}
    catch (e) {
        console.log(e);
    }
});


const timeString = () => {
    let date = new Date().getTime();
    // let time = {
    //   year: date.getFullYear(),
    //   month: date.getMonth() + 1, 
    //   date: date.getDate(),
    //   // hours: date.getHours(),
    //   // minutes: date.getMinutes(),
    // }
    // let now = `${time.year}년 ${time.month}월 ${time.date}일`;
    return date;
  }

//   const serverResult = (result) => {
//     let serverResult = {
//         "good":[],
//         "bad" :[],
//         "noneFeeedback" : ""
//     };
//     for (var i in result) {
//         let part = result[i].part;
//         let feedback = result[i].feedback
//         if (result[i].state == 'good') {
//             serverResult.good.push({
//                 "part": part,
//                 "feedback": feedback,
//             })
//         }
//         else if (result[i].state == 'bad') {
//             serverResult.bad.push({
//                 "part": part,
//                 "feedback": feedback,
//             })
//         }
//         else {
//             serverResult.noneFeeedback = feedback;
//         }
//     }
//     // console.log(serverResult,"SERVERRESULT");
    
//     return serverResult;
// }

  /*<<<<<<<<<<<<<
                {part: '상체 움직임',
                feedback: '상체 흔들림이 없고 안정적입니다.',
                state: 'good',},
                {part: '상체 움직임',
                feedback: '상체 흔들림이 없고 안정적입니다.',
                state: 'good',}
  */
 /*>>>>>>>>>>>
good:[{
    part: part;
    feedback :feedback;
},{
    part: part;
    feedback :feedback;
},{
    part: part;
    feedback :feedback;
}],
bad:[],
none:""
 */

module.exports = router;