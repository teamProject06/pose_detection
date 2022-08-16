const { Router } = require('express');
const { User } = require("./../models/schemas/userSchema");
const router = Router();

const axios = require("axios");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig.json");



router.get("/kakao", async(req, res, next) => {
    const REST_API_KEY = "ada966e93bbeabff88b6e8c8f28ae1d8";
    const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";

    const KAKAO_CODE = req.query.code;
    console.log(KAKAO_CODE);

    try{  //Request
        await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(getToken => {  //5번 토큰 가져온 거
            //console.log(getToken.data);
            getKakaouserInfo(getToken.data.access_token).then(userInfo => {
                console.log(userInfo.data);

                //user check 함수
                checkuserInfo(userInfo.data, res);
            });
        });
    }catch (e) {
        next(e);
    }
});


const checkuserInfo = async(userInfo, res) => {
    const checkEmail = await User.findOne({ email: userInfo.kakao_account.email });

    try{
        if(checkEmail){ //checkEmail이 존재한다면?(=가입이 되어 있다면)
            //로그인 진행
            jwt.sign({
                email: checkEmail.email,
                name: checkEmail.name,
            }, jwtConfig.secret, {
                expiresIn: '1d' // 1년(1y), 1일(1d), 2시간(2h), 1분(1m), 5초(5s) 
            }, (err, token) => {
                if(err){ //err가 존재한다면
                    res.status(401).json({
                        status: false, 
                        message: "로그인을 해주세요."
                    });
                }else{ // err가 존재하지 않는다면, 정상 로그인 진행 
                    res.json({
                        login: true,
                        status: true, 
                        accessToken: token, 
                        email: checkEmail.email, 
                        name: checkEmail.name
                    });
                }
            })
        } else{
            //회원가입 진행(회원가입 페이지로 보내줌)
            userInfo.login = false;
            res.json(userInfo)
        }
    } catch(e){
        console.log(e);
    }
}


// 카카오 유저 정보 가져오기
const getKakaouserInfo = async(token) => {
    return await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
}

module.exports = router;