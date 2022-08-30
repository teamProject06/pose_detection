import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import port from "./../../../data/port.json";

const NaverLoginCallback = () => {
    
    const navigate = useNavigate();
    const [cookiesAuth, setCookieAuth, removeCookieAuth] = useCookies(["auth"]);
    const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);
    
    const NAVER_CODE = new URL(window.location.href).searchParams.get("code");
    useEffect(() => {
        sendCode().then((res)=>{
            if (res.data.login) {
                setCookie("userInfo", res.data, { path: "/" });
                navigate("/");
            } else {
                setCookie("auth", res.data, { path: "/" });
                navigate("/oauth/signUp");
            }
        }).catch(e => {
            console.log(e);
        });
    },[]);
    
    const sendCode= async() =>{
        return await axios.get(port.url + '/oauth/naver',{
            params: {
                code: NAVER_CODE
            }
        })}
}

export default NaverLoginCallback;