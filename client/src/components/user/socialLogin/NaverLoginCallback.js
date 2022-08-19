import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import port from "./../../../data/port.json";

const NaverLoginCallback = () => {
    
    // const navigate = useNavigate();
    // const [cookiesAuth, setCookieAuth, removeCookieAuth] = useCookies(["auth"]);
    // const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
    
    const NAVER_CODE = new URL(window.location.href).searchParams.get("code");
    useEffect(() => {
        console.log("NAVER_CODE", NAVER_CODE);
        sendCode().then((res)=>{
            console.log("sendCode()가 완료되었습니다.");
            console.log(res, "email and name are in res.data");
        })
    },[]);
    
    const sendCode= async() =>{
        return await axios.get(port.url + '/auth/naver?code=' + NAVER_CODE)}
}

export default NaverLoginCallback;


/********************************************* */
//         sendCode().then((res) => {
//             console.log("res.data", res.data);

//             if (res.data.login) { //true면 로그인 되어있는상태

//                 setCookie("userData", res.data, { path: "/" });
//                 navigate("/review/list");

//             } else {             //false면 회원가입을 진행해야하는 상태
//                 setCookie("auth", res.data, { path: "/" });
//                 navigate("/oauth/signUp");
//             }



//         }).catch(e => {
//             console.log(e);
//             navigate("/");
//         })

//     }, []);

//     const sendCode = async () => {
//         return await axios.get(url.url + `/auth/kakao`, {
//             params: {
//                 code: KAKAO_PARAMS
//             }
//         });
//     }

// }
// export default KakaoCallBack;