const { Router } = require('express');
const router = Router();
const axios = require("axios");
const { User } = require("./../models/schemas/userSchema");
const jwt = require("jsonwebtoken");
const jwtConfig = require("./../config/jwtConfig.json");

/*_________________________NAVER SOCIAL LOGIN___________________________*/
// https://developers.naver.com/docs/login/devguide/devguide.md#3-4-2-%EB%84%A4%EC%9D%B4%EB%B2%84-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%97%B0%EB%8F%99-url-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0
router.get("/naver", async (req, res, next) => {
    const CODE = req.query.code;
    const CLIENT_ID = "h5d4QFUelFHA4__18dV1";
    const CLIENT_SECRET = "mFS_gJFSUJ";
    const STATE_STRING = "STATE";
    
    // res.send(
    // {
    //     id: '-_h1qKkUSBghU3QJq3cApOvAOecdn9BcyLFTUF6uv8c',
    //     email: 'rara9915@naver.com',
    //     name: '이나영'
    //   });
    try {
        getNaverToken(CLIENT_ID, CLIENT_SECRET, CODE, STATE_STRING)
            .then((tokenData) => {
                // console.log(tokenData,"tokenData");//ok
                getNaverUserdata(tokenData.data.access_token)
                .then((data) => {
                checkUserData(data.data, res);
            })
            
        })
    } catch (e) {
        console.log(e, "ERROR in naver router");
        next(e);
    }
});

const getNaverToken = async (CLIENT_ID, CLIENT_SECRET, CODE, STATE_STRING) => {
    // https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=jyvqXeaVOVmV&client_secret=527300A0_COq1_XV33cf&code=EIc5bFrl4RibFls1&state=9kgsGTfH4j7IyAkg  
    const NAVER_URL = "https://nid.naver.com/oauth2.0"; //for naver token
    return await axios.get(NAVER_URL + '/token', {
        params: {
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,//'h5d4QFUelFHA4__18dV1',
            client_secret: CLIENT_SECRET,
            state: STATE_STRING,//'hello',
            code: CODE,
        }
    })
}

const getNaverUserdata = async (TOKEN) => {
    return await axios.get("https://openapi.naver.com/v1/nid/me", {
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
        }
    })
}

const checkUserData = async (userData,res) => {
    console.log(userData,"userData");
    const checkEmail = await User.find({ email: userData.response.email });
    console.log(checkEmail,"checkEmail");
    try {

        if (checkEmail.length>0) {    //checkEmail이 존재한다면? 가입이되어있다면?
            //로그인 진행

            jwt.sign({
                email: checkEmail.email,
                name: checkEmail.name
            }, jwtConfig.secret, {
                expiresIn: '1d' //1y,1d,2h,1m,5s
            }, (err, token) => {
                if (err) {
                    res.status(401).json({ status: false, message: "로그인을 해주세요." });
                } else {
                    res.json({
                        login: true,
                        status: true,
                        accessToken: token,
                        email: checkEmail.email,
                        name: checkEmail.name
                    });
                }
            })


        } else {
            //회원가입 페이지로 보내줌
            // userData.login = false;
            console.log("else here ok")
            console.log(typeof(userData), "userDATA TYPE")
            userData.response.login = false;
            res.json(userData.response)
        }

    } catch (e) {
        console.log(e);
    }
}

module.exports = router;