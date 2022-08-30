const { Router } = require('express');
const router = Router();
const axios = require("axios");
const { User } = require("./../models/schemas/userSchema");
const jwt = require("jsonwebtoken");
const jwtConfig = require("./../config/jwtConfig.json");




/*_________________________NAVER SOCIAL LOGIN___________________________*/
router.get("/naver", async (req, res, next) => {
    const CLIENT_ID = "h5d4QFUelFHA4__18dV1";
    const CLIENT_SECRET = "mFS_gJFSUJ";
    const STATE_STRING = "STATE";
    const CALLBACK_URL = port.url + '/oauth/naver';
    const NAVER_URL_CREATE = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=${STATE_STRING}&redirect_uri=${CALLBACK_URL}`;
    
    
    try {
        await axios.get(NAVER_URL_CREATE).then((res) =>{
            const CODE = req.query.code;
            getNaverToken(CLIENT_ID, CLIENT_SECRET, CODE, STATE_STRING)
            .then((tokenData) => {
                getNaverUserdata(tokenData.data.access_token)
                    .then((data) => {
                        checkNaverUserData(data.data, res);
                    })
            })
        })
    } catch (e) {
        console.log(e, "ERROR in naver router");
        next(e);
    }
});

/*_________________________KAKAO SOCIAL LOGIN___________________________*/
router.get("/kakao", async (req, res, next) => {
    // const frontURL = 'https://fitback.site';
    const REST_API_KEY = '0009f476f7116da5e583fa0fc84ff1a3';
    const REDIRECT_URI = port.url + '/oauth/kakao';
    const KAKAO_URL_CREATE = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;


    try {
        await axios.get(KAKAO_URL_CREATE).then((res) => {
            const CODE = res.query.code;
            console.log(CODE, "CODE");
            getKakaoToken(REST_API_KEY, REDIRECT_URI, CODE)
                .then((tokenData) => {
                    console.log(tokenData.data.access_token, "tokenData.data.access_token");
                    getKakaoUserdata(tokenData.data.access_token)
                        .then((data) => {
                            console.log(data.data, "data.data");
                            checkKakaoUserData(data.data, res);
                        })
                })
        })

    } catch (e) {
        console.log(e, "ERROR in kakao router");
        next(e);
    }
});

const getNaverToken = async (CLIENT_ID, CLIENT_SECRET, CODE, STATE_STRING) => {
    // https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=jyvqXeaVOVmV&client_secret=527300A0_COq1_XV33cf&code=EIc5bFrl4RibFls1&state=9kgsGTfH4j7IyAkg  
    const NAVER_URL = "https://nid.naver.com/oauth2.0"; //for naver token
    return await axios.get(NAVER_URL + '/token', {
        params: {
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            state: STATE_STRING,
            code: CODE,
        }
    })
}

const getKakaoToken = async (REST_API_KEY, REDIRECT_URI, CODE) => {
    const KAKAO_URL = "https://kauth.kakao.com/oauth";
    return await axios.get(KAKAO_URL + '/token', {
        params: {
            grant_type: 'authorization_code',
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: CODE,
        },
        headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
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

const getKakaoUserdata = async (TOKEN) => {
    return await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        }
    })
}

const checkNaverUserData = async (userData, res) => {
    const checkEmail = await User.findOne({ email: userData.response.email });
    try {
        if (checkEmail) {
            jwt.sign({
                email: checkEmail.email,
                name: checkEmail.name
            }, jwtConfig.secret, {
                expiresIn: '1d'
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
            userData.response.login = false;
            res.json(userData.response)
        }

    } catch (e) {
        console.log(e);
    }
}

const checkKakaoUserData = async (userData, res) => {
    const checkEmail = await User.findOne({ email: userData.kakao_account.email });
    try {
        if (checkEmail) {
            jwt.sign({
                email: checkEmail.email,
                name: checkEmail.name
            }, jwtConfig.secret, {
                expiresIn: '1d'
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
            userData.kakao_account.login = false;
            res.json(userData.kakao_account)
        }

    } catch (e) {
        console.log(e);
    }
}

module.exports = router;