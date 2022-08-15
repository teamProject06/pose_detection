const { Router } = require("express");
const router = Router();
const crypto = require("crypto");
const util = require("util");
const { User } = require("./../models/schemas/userSchema");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig.json");

const pbkdf2Promise = util.promisify(crypto.pbkdf2); //for hash
const randomBytesPromise = util.promisify(crypto.randomBytes); //for hash

/*________________회원 가입_________________ */
router.post("/signup", async (req, res, next) => {
    const { email, password, name } = req.body;
    
    const userEmail = await User.findOne({ email });
    const userName = await User.findOne({ name });
    if (userEmail) {
      res.status(500).json({
        fail: "이미 가입된 이메일입니다.",
      });
      return;
    }
    if (userName) {
      res.status(500).json({
        fail: "중복된 이름입니다.",
      });
      return;
    }

    createHashedPassword(password).then((res)=>{
      User.create({
        email,
        password: res.hashedPassword,
        salt : res.salt,
        name,
      });
    })

    res.json({
      result: "회원가입이 완료되었습니다. 로그인을 해주세요!",
    });
  });

/*________________ 로그인 _________________ */
router.post("/signin", async (req, res, next) => {
    const { email, password } = req.body;

    const userEmail = await User.findOne({ email });
    const userPassword = userEmail.password;
    const userSalt = userEmail.salt;

    if (!userEmail) {
      res.status(401).json({
        message: "존재하지 않는 이메일입니다.",
      });
      return;
    }

    const verify = await verifyPassword(password, userSalt, userPassword);
    if (!verify) {
      res.status(401).json({
        message: "잘못된 비밀번호입니다.",
      });
      return;
    }

    jwt.sign(    //jsonwebtoken
      {
        email: email,
        name: userEmail.name,
      },
      jwtConfig.secret,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) {
          res.status(401).json({ 
            status: false,
            message: "로그인을 해주세요.", });
          } 
        else {
          res.json({
            status: true,
            accessToken: token,
            email: email,
            name: userEmail.name, });
          }
      }
    );
  });

/*________________hash with salt_________________ */
const createHashedPassword = async(password) => {
  // return crypto.createHash("sha512").update(password).digest("base64");
  const salt = await createSalt();
  const key = await pbkdf2Promise(password, salt, 108273, 64, "sha512");
  const hashedPassword = key.toString("base64");

  return await { hashedPassword, salt };
};

const createSalt = async () => {
  const element = await randomBytesPromise(64);
  return element.toString("base64");
};

const verifyPassword = async (password, salt, userPassword) => {
  const key = await pbkdf2Promise(password, salt, 108273, 64, "sha512");
  const hashedPassword = key.toString("base64");
  // console.log(serv : ", hashedPassword);
  // console.log(user : ", userPassword);
   if (hashedPassword === userPassword) return true;
   else return false;
};

module.exports = router;